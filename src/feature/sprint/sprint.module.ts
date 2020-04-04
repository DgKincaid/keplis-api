import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SprintService } from './sprint.service';

import { SprintSchema } from './models/Sprint';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Sprint', schema: SprintSchema }]) ],
  providers: [SprintService]
})
export class SprintModule {}
