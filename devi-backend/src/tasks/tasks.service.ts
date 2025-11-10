import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { StagesService } from 'src/stages/stages.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
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
      this.stagesService.updateStage(stage.id, {
        appId: stage.appId,
        name: stage.name,
        creatorId: stage.creatorId,
        status: stage.status,
        userId: stage.userId,
        currentTaskId: newTask.id,
        progress: await this.getStageProgress(stage.id),
      });
    }
    return newTask;
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
    return this.taskRepository.save({ ...task, status: 'completed' });
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

  private async getStageProgress(stageId: string): Promise<number> {
    const tasks = await this.getTaskByStageId(stageId);
    const completedTasks = tasks.filter(
      (task) => task.status === 'completed',
    ).length;
    return Math.round((completedTasks / tasks.length) * 100) || 0;
  }
}
