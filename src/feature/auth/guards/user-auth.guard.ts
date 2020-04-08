import { Injectable, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();

    console.log(request);

    let user = await this.authService.validateToken(request.user);

    if(!user) throw new UnauthorizedException();

    return user;
  }
}

