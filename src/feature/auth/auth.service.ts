import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { hash, compare } from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  public async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOnePassword(email);

    try {
      const isMatch = await compare(pass, user.password);

      if (isMatch) {

        const { password, ...result } = user;

        console.log(result);
        return result;
      }

    } catch (error) {
      // TODO: add api logging
      throw new BadRequestException('Email or password incorrect');
    }

    throw new BadRequestException('Email or password incorrect');;
  }

  public async uniqueEmail(email: string) {
    const user = await this.usersService.findOne(email);

    if(!user) {
      return true;
    }

    return false;
  }

  public async register(newUser: any) {

    if (await this.uniqueEmail(newUser.email)) {
      const hashedPassword = await hash(newUser.password, 14);

      newUser.password = hashedPassword;

      const user = await this.usersService.create(newUser);
      const payload = { email: user.email, sub: user._id };

      return {
        token: this.jwtService.sign(payload),
        user
      };
    }

    return null // validation error
  }

  public async login(credentials: any) {
    const user = await this.usersService.findOne(credentials.email)
    const payload = { email: user.email, sub: user._id };

    await this.updateLogin(user._id);

    return {
      token: this.jwtService.sign(payload),
      user
    };
  }

  private async updateLogin(id: string) {

    try {
      await this.usersService.updateLogin(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
