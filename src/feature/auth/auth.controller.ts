import { Controller, Request, Post, Body, Patch, UseGuards, UsePipes, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { RegisterAuthDto, ResponseAuthDto } from './dto';
import { RegisterAuthSchema } from './schema';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @UsePipes(new JoiValidationPipe(RegisterAuthSchema))
  public async register(@Body() authRegister: RegisterAuthDto) {

    const newUser = await this.authService.register(authRegister);

    if(newUser) {
      return newUser;
    }

    throw new BadRequestException('Duplicate email');
  }

  @Patch('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 200, description: 'Logged in Successfuly.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async login(@Body() credentials) {
    return this.authService.login(credentials)
  }
}