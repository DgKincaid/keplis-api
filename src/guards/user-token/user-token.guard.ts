import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserTokenGuard implements CanActivate {

  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();

    console.log(request);

    let user = null;

    if(!user) throw new UnauthorizedException();

    return user;
  }
}
