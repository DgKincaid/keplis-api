import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule, UsersModule } from './feature';
import { StoryModule } from './feature/story/story.module';
import { GroupsModule } from './feature/groups/groups.module';
import { TasksModule } from './feature/tasks/tasks.module';
import { SprintModule } from './feature/sprint/sprint.module';
import { CommentModule } from './feature/comment/comment.module';
import { ProjectModule } from './feature/project/project.module';
import { OrganizationModule } from './feature/organization/organization.module';
import { UserTokenModule } from './guards/user-token/user-token.module';
import { UserDbModule } from './db/user-db/user-db.module';
import { CommentDbModule } from './db/comment-db/comment-db.module';
import { GroupDbModule } from './db/group-db/group-db.module';
import { OrganizationDbModule } from './db/organization-db/organization-db.module';
import { StoryDbModule } from './db/story-db/story-db.module';
import { ProjectDbModule } from './db/project-db/project-db.module';
import { SprintDbModule } from './db/sprint-db/sprint-db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('DB_USER')}:${configService.get<string>('DB_PASS')}@${configService.get<string>('DB_URL')}/${configService.get<string>('DB_NAME')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ ConfigService ]
    }),
    AuthModule,
    UsersModule,
    StoryModule,
    GroupsModule,
    TasksModule,
    SprintModule,
    CommentModule,
    ProjectModule,
    OrganizationModule,
    UserTokenModule,
    UserDbModule,
    CommentDbModule,
    GroupDbModule,
    OrganizationDbModule,
    StoryDbModule,
    ProjectDbModule,
    SprintDbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
