import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectSchema } from './Project';
import { ProjectDbService } from './project-db.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
  ],
  providers: [ ProjectDbService ],
  exports: [ ProjectDbService ]
})
export class ProjectDbModule {
}
