import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,) {}

  public async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    console.log(user);
    if (user && user.password === pass) {

      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  public async login(user: any) {
    const payload = { email: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
