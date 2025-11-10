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
import type { Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { Stages } from './stages.entity';
import { UsersService } from 'src/users/users.service';
import { decode } from 'jsonwebtoken';
import { DeleteResult } from 'typeorm';

@Controller('stages')
export class StagesController {
  constructor(
    private stagesService: StagesService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createStage(
    @Body() stage: CreateStageDto,
    @Req() req: Request,
  ): Promise<Stages> {
    const actk = req.headers['authorization']?.split(' ')[1];
    const data = decode(actk!, { json: true });
    const { email } = data!;

    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.stagesService.createStage(stage, user.id);
  }

  @Get(':id')
  getStage(@Param('id') id: string): Promise<Stages> {
    return this.stagesService.getStage(id);
  }

  @Get('app/:id')
  getStagesByAppId(@Param('id') id: string): Promise<Stages[]> {
    return this.stagesService.getStagesByAppId(id);
  }

  @Get('user/:id')
  getStagesByCreatorId(@Param('id') id: string): Promise<Stages[]> {
    return this.stagesService.getStagesByCreatorId(id);
  }

  @Put(':id')
  updateStage(
    @Param('id') id: string,
    @Body() stage: CreateStageDto,
  ): Promise<Stages> {
    return this.stagesService.updateStage(id, stage);
  }

  @Delete(':id')
  async deleteStage(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.stagesService.deleteStage(id);
    console.log(result);
    return result;
  }

  @Get()
  getAllStages(): Promise<Stages[]> {
    return this.stagesService.getAllStages();
  }
}
