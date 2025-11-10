import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Apps } from './apps.entity';
import { CreateAppDto } from './dto/create-app.dto';
import { v4 } from 'uuid';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(Apps)
    private appsRepository: Repository<Apps>,
  ) {}

  async createApp(app: CreateAppDto, user: string): Promise<Apps> {
    const newApp: CreateAppDto = {
      ...app,
      id: v4(),
      userId: user,
      status: 'pending',
    };
    console.log(newApp);
    return this.appsRepository.save(newApp);
  }

  async getApp(id: string): Promise<Apps> {
    return this.appsRepository.findOne({
      where: { id },
      relations: ['user'],
    }) as Promise<Apps>;
  }

  async getApps(): Promise<Apps[]> {
    return this.appsRepository.find({ relations: ['user'] });
  }

  async updateApp(id: string, app: CreateAppDto): Promise<Apps> {
    const appToUpdate = await this.appsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!appToUpdate) {
      throw new HttpException('App not found', HttpStatus.NOT_FOUND);
    }
    appToUpdate.name = app.name;
    appToUpdate.websiteUrl = app.websiteUrl;
    appToUpdate.logoUrl = app.logoUrl;
    appToUpdate.githubUrl = app.githubUrl;
    appToUpdate.description = app.description;
    return this.appsRepository.save(appToUpdate);
  }

  async deleteApp(id: string): Promise<DeleteResult> {
    return await this.appsRepository.delete(id);
  }

  async getAppsByUserId(user: string): Promise<Apps[]> {
    return this.appsRepository.find({
      where: { user: { id: user } },
      relations: ['user'],
    }) as Promise<Apps[]>;
  }
}
