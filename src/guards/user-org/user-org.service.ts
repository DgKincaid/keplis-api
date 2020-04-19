import { Injectable, Inject } from '@nestjs/common';

import { UserDbService, OrganizationDbService } from 'src/db';

@Injectable()
export class UserOrgService {
  constructor(
    @Inject('UserDbService') private userDbService: UserDbService,
    @Inject('OrganizationDbService') private orgDbService: OrganizationDbService,
  ) {}

  public async validateUserOrg(userId, orgId) {

    let user = await this.userDbService.findOneById(userId);
    let org = await this.orgDbService.findOneById(orgId);

    if(org && user.groups.has(org.group.toString())) {
      return true;
    }

    return false;
  }
}
