import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Docker } from './docker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDockerDto } from './dto/create-docker.dto';
import { v4 } from 'uuid';

export type Container = {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  State: string;
  Status: string;
  Ports: string[];
  Labels: Record<string, string>;
  NetworkSettings: {
    Networks: Record<
      string,
      {
        IPAMConfig: Record<string, string>;
        Links: string[];
        Aliases: string[];
        NetworkID: string;
      }
    >;
  };
  Mounts: {
    Source: string;
    Destination: string;
    Mode: string;
    RW: boolean;
  }[];
};

@Injectable()
export class DockerService {
  constructor(
    @InjectRepository(Docker)
    private dockerRepository: Repository<Docker>,
  ) {}

  async createDocker(docker: CreateDockerDto, user: string): Promise<Docker> {
    const newDocker: Docker = {
      ...docker,
      id: v4(),
      creatorId: user,
      active: true,
      createdAt: new Date(),
    };
    return this.dockerRepository.save(newDocker);
  }

  async getDocker(id: string): Promise<Docker | null> {
    return this.dockerRepository.findOne({ where: { id } });
  }

  async getDockerByCreatorId(creatorId: string): Promise<Docker[]> {
    return this.dockerRepository.find({ where: { creatorId } });
  }

  async getDockerByActive(active: boolean): Promise<Docker[]> {
    return this.dockerRepository.find({ where: { active } });
  }

  async updateDocker(id: string, docker: CreateDockerDto): Promise<Docker> {
    return this.dockerRepository.save(docker);
  }

  async deleteDocker(id: string): Promise<DeleteResult> {
    return this.dockerRepository.delete(id);
  }

  async getAllDocker(): Promise<Docker[]> {
    return this.dockerRepository.find();
  }

  async getContainers(dockerId: string): Promise<Container[]> {
    try {
      const connection = await this.dockerRepository.findOne({
        where: { id: dockerId },
      });
      if (!connection) {
        throw new NotFoundException('Connection not found');
      }
      console.log(`${connection.host}:${connection.port}/containers/json`);
      const res = await fetch(
        `${connection.host}:${connection.port}/containers/json`,
      );
      const data = await res.json();
      return data;
    } catch (error) {
      throw new NotFoundException(
        'Failed to get containers ' + (error as Error).message,
      );
    }
  }
}
