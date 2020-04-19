import { Module } from '@nestjs/common';
import { UserOrgService } from './user-org.service';
import { UserOrgGuard } from './user-org.guard';

@Module({
  providers: [ UserOrgService, UserOrgGuard ],
  exports: [ UserOrgService, UserOrgGuard ]
})
export class UserOrgModule {}
