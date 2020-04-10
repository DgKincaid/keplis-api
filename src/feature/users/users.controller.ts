import { Controller, UseGuards, Request, Get, Param, Patch, Post, Body, UsePipes } from '@nestjs/common';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards';

import { IUser } from '../../db/user-db/IUser';

import { UserSchema } from './schema/user.schema';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Find all users'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Find one user'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async findOne(@Param('id') id): Promise<IUser | undefined> {
    return await this.usersService.findOneById(id);
  }

  @Patch()
  @UsePipes(new JoiValidationPipe(UserSchema))
  @ApiResponse({ status: 200, description: 'Update user'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async update(@Body() user): Promise<IUser | undefined> {
    return await this.usersService.updateUser(user);
  }
}
