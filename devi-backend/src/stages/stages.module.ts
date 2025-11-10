import { Module } from '@nestjs/common';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stages } from './stages.entity';
import { AppsModule } from 'src/apps/apps.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stages]), AppsModule, UsersModule],
  controllers: [StagesController],
  providers: [StagesService],
  exports: [StagesService],
})
export class StagesModule {}
