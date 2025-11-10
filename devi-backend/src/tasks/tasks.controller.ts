import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { decode } from 'jsonwebtoken';
import { Task } from './task.entity';
import { UsersService } from 'src/users/users.service';
import { Body } from '@nestjs/common';
import type { Request } from 'express';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {}
  @Post()
  async createTask(
    @Body() task: CreateTaskDto,
    @Req() req: Request,
  ): Promise<Task> {
    const actk = req.headers['authorization']?.split(' ')[1];
    const data = decode(actk!, { json: true });
    const { email } = data!;

    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.tasksService.createTask(task, user.id);
  }
  @Get(':id')
  async getTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTask(id);
  }
  @Get('stage/:id')
  async getTasksByStageId(@Param('id') id: string): Promise<Task[]> {
    return this.tasksService.getTaskByStageId(id);
  }
  @Get('user/:id')
  async getTasksByUserId(@Param('id') id: string): Promise<Task[]> {
    return this.tasksService.getTaskByUserId(id);
  }
  @Get('creator/:id')
  async getTasksByCreatorId(@Param('id') id: string): Promise<Task[]> {
    return this.tasksService.getTaskByCreatorId(id);
  }
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, task);
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.tasksService.deleteTask(id);
    console.log(result);
    return result;
  }
  @Put(':id')
  async completeTask(
    @Param('id') id: string,
    @Body() task: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, task);
  }
}
