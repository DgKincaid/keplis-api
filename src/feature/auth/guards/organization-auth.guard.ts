import { Injectable, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class OrganizationAuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request);
    return false;
  }
}

