import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskDbService } from './task-db.service';
import { TaskSchema } from './Task';

@Global()
@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]) ],
  providers: [TaskDbService],
  exports: [ TaskDbService ]
})
export class TaskDbModule {}
