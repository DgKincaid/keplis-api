import { Module } from '@nestjs/common';

import { GroupsService } from './groups.service';

@Module({
  imports: [],
  providers: [GroupsService],
  exports: [ GroupsService ]
})
export class GroupsModule {}
