import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrganizationService } from './organization.service';
import { OrganizationSchema } from './models/Organization';
import { OrganizationController } from './organization.controller';
import { GroupsModule } from '../groups/groups.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Organization', schema: OrganizationSchema }]),
    GroupsModule,
    UsersModule
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
