import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { Stages } from './stages.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stages)
    private stagesRepository: Repository<Stages>,
    @Inject(forwardRef(() => TasksService))
    private tasksService: TasksService,
  ) {}
  async createStage(stage: CreateStageDto, user: string): Promise<Stages> {
    return this.stagesRepository.save({
      ...stage,
      id: v4(),
      creator: { id: user },
      status: 'pending',
    });
  }

  async getStage(id: string): Promise<Stages> {
    return this.stagesRepository.findOne({
      where: { id },
      relations: ['user', 'creator', 'currentTask'],
    }) as Promise<Stages>;
  }

  async getStages(): Promise<Stages[]> {
    return this.stagesRepository.find({
      relations: ['user', 'creator', 'currentTask'],
    });
  }

  async updateStage(id: string, stage: CreateStageDto): Promise<Stages> {
    const existingStage = await this.getStage(id);
    if (!existingStage) {
      throw new NotFoundException('Stage not found');
    }
    existingStage.name = stage.name;
    existingStage.description = stage.description;
    existingStage.status = stage.status;
    existingStage.userId = stage.userId;
    existingStage.creatorId = stage.creatorId;
    existingStage.expectedCompletionDate = stage.expectedCompletionDate;
    existingStage.completionDate = stage.completionDate;
    existingStage.appId = stage.appId;
    existingStage.currentTaskId = stage.currentTaskId;
    return this.stagesRepository.save({
      ...existingStage,
      ...stage,
    });
  }

  async deleteStage(id: string): Promise<DeleteResult> {
    return await this.stagesRepository.delete(id);
  }

  async getStagesByAppId(appId: string): Promise<Stages[]> {
    return this.stagesRepository.find({
      where: { appId },
      relations: ['user', 'creator', 'currentTask'],
    });
  }

  async getStagesByCreatorId(creatorId: string): Promise<Stages[]> {
    return this.stagesRepository.find({
      where: { creatorId },
      relations: ['user', 'creator', 'currentTask'],
    });
  }

  async getAllStages(): Promise<Stages[]> {
    return this.stagesRepository.find({
      relations: ['user', 'creator', 'currentTask'],
    });
  }

  async calculateStageProgress(stageId: string): Promise<Stages> {
    const stage = await this.getStage(stageId);
    if (!stage) {
      throw new NotFoundException('Stage not found');
    }
    const tasks = await this.tasksService.getTaskByStageId(stageId);
    const completedTasks = tasks.filter(
      (task) => task.status === 'completed',
    ).length;
    const progress = Math.round((completedTasks / tasks.length) * 100) || 0;
    stage.progress = progress;
    return this.stagesRepository.save({
      ...stage,
      progress,
    });
  }
}
