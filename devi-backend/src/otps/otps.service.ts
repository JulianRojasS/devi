import { Injectable } from '@nestjs/common';
import { Otps } from './otps.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateOtpsDto } from './dto/create-otps.dto';
import { NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class OtpsService {
  constructor(
    @InjectRepository(Otps)
    private otpsRepository: Repository<Otps>,
    private usersService: UsersService,
  ) {}

  async create(otp: CreateOtpsDto, userId: string): Promise<Otps> {
    const user = await this.usersService.getOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.otpsRepository.save({
      id: v4(),
      name: otp.name,
      secret: otp.secret,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findAll(): Promise<Otps[]> {
    return this.otpsRepository.find();
  }

  async findOne(id: string): Promise<Otps | null> {
    return this.otpsRepository.findOne({ where: { id } });
  }

  async update(id: string, otp: CreateOtpsDto): Promise<Otps> {
    return this.otpsRepository.save(otp);
  }

  async delete(id: string): Promise<void> {
    await this.otpsRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<Otps[]> {
    return this.otpsRepository.find({ where: { userId } });
  }
}
