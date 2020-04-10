import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectSchema } from './models/Project';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserTokenModule } from '../../guards/user-token/user-token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    UserTokenModule
  ],

  providers: [ ProjectService ],

  controllers: [ProjectController]
})
export class ProjectModule {}
