import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule, UsersModule } from './feature';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('DB_USER')}:${configService.get<string>('DB_PASS')}@${configService.get<string>('DB_URL')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ ConfigService ]
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
