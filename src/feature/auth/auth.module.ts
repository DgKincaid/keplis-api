import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategy';

import { UsersModule } from '../users/users.module';
import { JwtAuthGuard, UserAuthGuard } from './guards';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' }
      }),
      inject: [ ConfigService ]
    }),
    ConfigModule
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, UserAuthGuard ],
  exports: [ JwtAuthGuard, UserAuthGuard ]
})
export class AuthModule { }