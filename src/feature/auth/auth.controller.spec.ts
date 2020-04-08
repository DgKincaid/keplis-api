import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy';
import { UsersModule } from '../users/users.module';
import { IUser } from '../users/interfaces/IUser';

jest.mock('./auth.service')
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      controllers: [ AuthController ],
      providers: [
        LocalStrategy,
        AuthService
        // {
        //   provide: AuthService,
        //   useValue: AuthServiceMock,
        // }
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
    authService = moduleRef.get<AuthService>(AuthService);
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

      var res = {
        token: '',
        user: result as IUser
      }
      jest.spyOn(authService, 'register').mockResolvedValue(res);

      let user = await authController.register(registerReq);
    })

    it('should return a duplicate email error', async () => {
      const result = {
        email: 'john@comcast.com',
        firstName: 'John',
        lastName: 'Wick',
      };
      let err;

      jest.spyOn(authService, 'register').mockResolvedValue(null);
      try {
        await authController.register(registerReq);
      } catch (error) {
        err = error;
      }

      expect(err).toBeDefined();
      expect(err.status).toEqual(400);
      expect(err.message).toEqual('Duplicate email');
    })
  })

  describe('login', () => {
    const loginReq = {
      email: 'john@comcast.com',
      password: 'password1234'
    }

    it('should return a 200 + auth response', async() => {
      const result = {
        token: '',
        user: {
          email: 'john@comcast.com',
          firstName: 'John',
          lastName: 'Wick',
        } as IUser
      }

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      let authToken = await authController.login(loginReq);
    })
  })
})