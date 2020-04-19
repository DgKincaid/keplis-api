import { Module } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserTokenModule, UserOrgModule } from '../../guards';

@Module({
  imports: [
    UserTokenModule,
    UserOrgModule,
  ],

  providers: [ ProjectService ],

  controllers: [ProjectController]
})
export class ProjectModule {}
