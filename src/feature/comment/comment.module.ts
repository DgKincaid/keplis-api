import { Module } from '@nestjs/common';

import { CommentService } from './comment.service';

@Module({
  imports: [ ],
  providers: [CommentService]
})
export class CommentModule {}
