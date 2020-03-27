import { Controller, Request, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { RegisterAuthDto, ResponseAuthDto } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public register(@Body() authRegister: RegisterAuthDto): ResponseAuthDto {
    console.log(authRegister);
    const auth: ResponseAuthDto = {
      token: 'test',
      user: { }
    }

    return auth;
  }

  @UseGuards(LocalAuthGuard)
  @Patch('login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }
}