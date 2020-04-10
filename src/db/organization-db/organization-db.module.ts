import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrganizationDbService } from './organization-db.service';
import { OrganizationSchema } from './Organization';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Organization', schema: OrganizationSchema }]),
  ],
  providers: [OrganizationDbService],
  exports: [ OrganizationDbService]
})
export class OrganizationDbModule {}
