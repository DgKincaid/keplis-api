import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserTokenService } from './user-token.service';

@Injectable()
export class UserTokenGuard implements CanActivate {

  constructor(private userTokenService: UserTokenService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest();

    let user = await this.userTokenService.validateUserToken(request.user.userId);

    if(!user) throw new UnauthorizedException();

    return user;
  }
}
