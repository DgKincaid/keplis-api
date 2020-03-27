import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@UseGuards()
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  public findAll(@Request() req) {
    return this.usersService.findAll();
  }
}
