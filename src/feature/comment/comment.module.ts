import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentService } from './comment.service';
import { CommentSchema } from './models/Comment';

@Module({
  imports: [ MongooseModule.forFeature([ { name: 'Comment', schema: CommentSchema } ])],
  providers: [CommentService]
})
export class CommentModule {}
