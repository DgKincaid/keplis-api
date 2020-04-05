import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // handleRequest(err, user, info: Error) {
  //   console.log(user);
  //   if(user) {
  //     return user;
  //   }

  //   throw new UnauthorizedException();
  // }
}
