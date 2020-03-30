import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './feature/auth/guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
