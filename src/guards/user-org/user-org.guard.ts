import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserOrgService } from './user-org.service';

@Injectable()
export class UserOrgGuard implements CanActivate {

  constructor(private userOrgService: UserOrgService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    let valid = await this.userOrgService.validateUserOrg(request.user.userId, request.params.orgId);

    return valid;
  }
}
