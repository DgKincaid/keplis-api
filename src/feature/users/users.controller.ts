import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public findAll(@Request() req) {
    return this.usersService.findAll();
  }
}
