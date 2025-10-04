import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this.appsRepository.save({
      id: v4(),
      ...app,
      user: { id: user },
      status: 'active',
    });
  }

  async getApp(id: string): Promise<Apps> {
    return this.appsRepository.findOne({ where: { id } }) as Promise<Apps>;
  }

  async getApps(): Promise<Apps[]> {
    return this.appsRepository.find();
  }

  async updateApp(id: string, app: CreateAppDto): Promise<Apps> {
    return this.appsRepository.save(app);
  }

  async deleteApp(id: string): Promise<void> {
    await this.appsRepository.delete(id);
  }

  async getAppsByUserId(user: string): Promise<Apps[]> {
    return this.appsRepository.find({
      where: { user: { id: user } },
    }) as Promise<Apps[]>;
  }
}
