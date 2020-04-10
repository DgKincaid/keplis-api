import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GroupSchema } from './Group';
import { GroupDbService } from './group-db.service';

@Global()
@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema}]) ],
  providers: [ GroupDbService ],
  exports: [ GroupDbService ]
})
export class GroupDbModule {}
