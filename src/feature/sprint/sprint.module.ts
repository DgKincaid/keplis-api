import { Module } from '@nestjs/common';

import { SprintService } from './sprint.service';

@Module({
  imports: [ ],
  providers: [SprintService]
})
export class SprintModule {}
