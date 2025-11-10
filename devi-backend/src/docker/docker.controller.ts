import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Container, DockerService } from './docker.service';
import { CreateDockerDto } from './dto/create-docker.dto';
import { Docker } from './docker.entity';
import type { Request } from 'express';
import { decode } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DeleteResult } from 'typeorm';

@Controller('docker')
export class DockerController {
  constructor(
    private dockerService: DockerService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createDocker(
    @Body() docker: CreateDockerDto,
    @Req() req: Request,
  ): Promise<Docker> {
    const actk = req.headers['authorization']?.split(' ')[1];
    const data = decode(actk!, { json: true });
    const { email } = data!;
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.dockerService.createDocker(docker, user.id);
  }

  @Get(':id')
  getDocker(@Param('id') id: string): Promise<Docker | null> {
    return this.dockerService.getDocker(id);
  }

  @Get()
  getAllDocker(): Promise<Docker[]> {
    return this.dockerService.getAllDocker();
  }

  @Put(':id')
  async updateDocker(
    @Param('id') id: string,
    @Body() docker: CreateDockerDto,
  ): Promise<Docker> {
    return await this.dockerService.updateDocker(id, docker);
  }

  @Delete(':id')
  async deleteDocker(@Param('id') id: string): Promise<DeleteResult> {
    return await this.dockerService.deleteDocker(id);
  }

  @Get('creator/:id')
  getDockerByCreatorId(@Param('id') id: string): Promise<Docker[]> {
    return this.dockerService.getDockerByCreatorId(id);
  }

  @Get('active')
  getDockerByActive(active: boolean): Promise<Docker[]> {
    return this.dockerService.getDockerByActive(active);
  }

  @Get('containers/:id')
  getContainers(@Param('id') id: string): Promise<Container[]> {
    return this.dockerService.getContainers(id);
  }
}
