import { Module } from '@nestjs/common';
import { OtpsService } from './otps.service';
import { OtpsController } from './otps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otps } from './otps.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otps]), UsersModule],
  providers: [OtpsService],
  controllers: [OtpsController],
  exports: [OtpsService],
})
export class OtpsModule {}
