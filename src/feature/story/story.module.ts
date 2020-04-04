import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StorySchema } from './models/Story';
import { StoryService } from './story.service';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }]) ],
  providers: [StoryService]
})
export class StoryModule {}
