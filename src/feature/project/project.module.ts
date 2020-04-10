import { Module } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserTokenModule } from '../../guards/user-token/user-token.module';

@Module({
  imports: [
    UserTokenModule
  ],

  providers: [ ProjectService ],

  controllers: [ProjectController]
})
export class ProjectModule {}
