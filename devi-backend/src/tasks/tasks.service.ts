import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Task } from './task.entity';
import { DeleteResult, LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { StagesService } from 'src/stages/stages.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @Inject(forwardRef(() => StagesService))
    private stagesService: StagesService,
  ) {}
  async createTask(task: CreateTaskDto, user: string): Promise<Task> {
    const stage = await this.stagesService.getStage(task.stageId);
    if (!stage) {
      throw new NotFoundException('Stage not found');
    }
    const newTask = await this.taskRepository.save({
      ...task,
      id: v4(),
      creator: { id: user },
      status: 'pending',
    });
    if (!stage.currentTask) {
      await this.stagesService.calculateStageProgress(stage.id);
    }
    return newTask;
  }
  async selectCurrentTask(taskId: string): Promise<Task> {
    const task = await this.getTask(taskId); /// get the task to select
    if (!task) {
      throw new NotFoundException('Task not found'); /// if the task is not found, throw an error
    }
    const stageTasks = await this.getTasks(task.stageId); /// get the tasks of the stage
    const currentTask = stageTasks.find((t) => t.status === 'in_progress'); /// find the current task
    if (currentTask) {
      await this.taskRepository.save({
        /// if the current task is found, update it to pending
        ...currentTask,
        status: 'pending',
      }); /// update the current task to pending
    }
    const result = await this.taskRepository.save({
      /// update the task to in_progress
      ...task,
      status: 'in_progress',
    });
    await this.stagesService.calculateStageProgress(task.stageId); /// calculate the stage progress
    return result; /// return the result
  }
  async getTasks(stageId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { stageId },
      relations: ['creator', 'user', 'stage'],
    });
  }
  async getTask(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['creator', 'user', 'stage'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
  async updateTask(id: string, taskData: CreateTaskDto): Promise<Task> {
    const task = await this.getTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.name = taskData.name;
    task.description = taskData.description;
    task.stageId = taskData.stageId;
    task.creatorId = taskData.creatorId;
    task.userId = taskData.userId;
    task.startDate = taskData.startDate;
    task.endDate = taskData.endDate;
    task.status = taskData.status || task.status;
    return this.taskRepository.save(task);
  }
  async deleteTask(id: string): Promise<DeleteResult> {
    const task = await this.getTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return await this.taskRepository.delete(id);
  }
  async completeTask(id: string): Promise<Task> {
    const task = await this.getTask(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const result = await this.taskRepository.save({
      ...task,
      status: 'completed',
    });
    await this.stagesService.calculateStageProgress(task.stageId);
    return result;
  }
  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['creator', 'user', 'stage'],
    });
  }
  async getTaskByUserId(userId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId },
      relations: ['creator', 'user', 'stage'],
    });
  }
  async getTaskByCreatorId(creatorId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { creatorId },
      relations: ['creator', 'user', 'stage'],
    });
  }
  async getTaskByStageId(stageId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { stageId },
      relations: ['creator', 'user', 'stage'],
    });
  }
  @Cron('0 0 * * *') // every day at midnight
  async tasksCompilance() {
    const expiredTasks = await this.taskRepository.find({
      /// search tasks that are pending and have an end date in the past
      where: { status: 'pending', endDate: LessThan(new Date()) },
    });
    for (const task of expiredTasks) {
      await this.taskRepository.save({
        ...task,
        status: 'expired',
      });
    }
  }
}
