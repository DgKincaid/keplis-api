import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GroupSchema } from './models/Group';
import { GroupsService } from './groups.service';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema}]) ],
  providers: [GroupsService]
})
export class GroupsModule {}
