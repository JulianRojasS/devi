import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateOtpsDto } from './dto/create-otps.dto';
import { OtpsService } from './otps.service';
import { type Request } from 'express';
import { decode } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Controller('otps')
export class OtpsController {
  constructor(
    private otpsService: OtpsService,
    private usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createOtpsDto: CreateOtpsDto, @Req() req: Request) {
    const actk = req.headers['authorization']?.split(' ')[1];
    const data = decode(actk!, { json: true });
    const { email } = data!;

    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.otpsService.create(createOtpsDto, user.id);
  }
  @Get()
  findAll() {
    return this.otpsService.findAll();
  }
  @Get('app/:appId')
  findByAppId(@Param('appId') appId: string) {
    return this.otpsService.findByAppId(appId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpsService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateOtpsDto) {
    return this.otpsService.update(id, body);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.otpsService.delete(id);
  }
}
