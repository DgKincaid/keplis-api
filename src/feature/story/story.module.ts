import { Module } from '@nestjs/common';

import { UserTokenModule, UserOrgModule } from '../../guards';

import { StoryService } from './story.service';
import { StoryController } from './story.controller';

@Module({
  imports: [
    UserTokenModule,
    UserOrgModule,
  ],
  providers: [StoryService],
  controllers: [StoryController]
})
export class StoryModule {}
