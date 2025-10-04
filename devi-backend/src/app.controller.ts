import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IpAddress } from './common/decorators/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getIp(@IpAddress() ip: string): string {
    return `Your IP address is ${ip}`;
  }
}
