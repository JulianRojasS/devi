import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AppsService } from './apps.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateAppDto } from './dto/create-app.dto';
import { decode } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
@UseGuards(AuthGuard)
@Controller('apps')
export class AppsController {
  constructor(
    private appsService: AppsService,
    private usersService: UsersService,
  ) {}

  @Get()
  getApps() {
    return this.appsService.getApps();
  }

  @Get(':id')
  getApp(@Param('id') id: string) {
    return this.appsService.getApp(id);
  }

  @Post()
  async createApp(@Body() app: CreateAppDto, @Req() req: Request) {
    const actk = req.headers['authorization']?.split(' ')[1];
    const data = decode(actk, { json: true });
    const { email } = data!;

    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.appsService.createApp(app, user.id);
  }

  @Put(':id')
  updateApp(@Param('id') id: string, @Body() app: CreateAppDto) {
    return this.appsService.updateApp(id, app);
  }

  @Delete(':id')
  deleteApp(@Param('id') id: string) {
    return this.appsService.deleteApp(id);
  }

  @Get('user/:id')
  getAppsByUserId(@Param('id') id: string) {
    return this.appsService.getAppsByUserId(id);
  }
}
