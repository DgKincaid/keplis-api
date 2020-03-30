import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy';
import { UsersModule } from '../users/users.module';

class AuthServiceMock {
  validateUser() {
    return null;
  }

  register() {
    console.log('register');
    return null;
  }
}

jest.mock('./auth.service')
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      controllers: [ AuthController ],
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        }
      ],
      imports: [
        JwtModule.register({
          secret: 'testing-secret',
          signOptions: {
            expiresIn: '60m'
          }
        })
      ]
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    // authService = moduleRef.get<AuthService>(AuthService);
  })

  describe('register', () => {
    const registerReq = {
      email: 'john@comcast.com',
      firstName: 'John',
      lastName: 'Wick',
      password: 'password1234'
    };

    it('should return an array of auths', async () => {
      const result = {
        email: 'john@comcast.com',
        firstName: 'John',
        lastName: 'Wick',
      };

      let user = authController.register(registerReq);

      console.log(user);
    })
  })
})