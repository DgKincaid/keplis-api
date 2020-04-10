import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SprintDbService } from './sprint-db.service';
import { SprintSchema } from './Sprint';

@Global()
@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Sprint', schema: SprintSchema }]) ],
  providers: [SprintDbService]
})
export class SprintDbModule {}
