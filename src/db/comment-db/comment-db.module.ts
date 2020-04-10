import { Module, Global } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { CommentSchema } from './Comment';
import { CommentDbService } from './comment-db.service';

@Global()
@Module({
  imports: [ MongooseModule.forFeature([ { name: 'Comment', schema: CommentSchema } ]) ],
  providers: [CommentDbService]
})
export class CommentDbModule {}
