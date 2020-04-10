import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StoryDbService } from './story-db.service';
import { StorySchema } from './Story';

@Global()
@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }]) ],
  providers: [StoryDbService],
  exports: [ StoryDbService ]
})
export class StoryDbModule {}
