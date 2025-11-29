import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { type Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('count')
  getUserCount() {
    return this.usersService.getUserCount();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.usersService.getOneById(id);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @UseGuards(AuthGuard)
  @Get('statistics')
  statistics() {
    return this.usersService.statistics();
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { user, accessToken, refreshToken } = await this.usersService.login(
      body.email,
      body.password,
    );
    res.cookie('devi-actk', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, // 1 hour (matching token expiration)
    });
    res.cookie('devi-rftk', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).send({
      success: true,
      data: { user, accessToken, refreshToken },
      model: 'users',
      date: new Date().toISOString(),
      'ip-access': res.req.ip || res.req.connection.remoteAddress,
      statusCode: 200,
    });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Headers('authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    return this.usersService.logout(token);
  }

  @UseGuards(AuthGuard)
  @Get('profile/me')
  profile(@Headers('authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    return this.usersService.profile(token);
  }

  @UseGuards(AuthGuard)
  @Get('github/repositories')
  fetchGithubRepositories(@Headers('authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    return this.usersService.fetchGithubRepositories(token);
  }
}
