
import { TestingModule, Test } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { IUser } from '../../db';

jest.mock('bcrypt');

describe('AuthService', () => {
  let testingModule: TestingModule;
  let authService: AuthService;
  let spyUsersService: UsersService;

  let result = {
    email: 'test@test.com',
    firstName: 'Job',
    lastName: 'Stable',
    password: 'asdfsss'
  }

  beforeEach(async () => {

    testingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: () => ({
            secret: 'hard!to-guess_secret'
          })
        })
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useFactory: () => ({
            findOnePassword: jest.fn(() => result),
            findOne: jest.fn(),
            create: jest.fn(),
            updateLogin: jest.fn(),
          })
        }
      ],
    }).compile();

    authService = testingModule.get(AuthService);
    spyUsersService = testingModule.get(UsersService);
  })

  describe('validateUser()', () => {

    it('should successfuly match user', async () => {

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      let user = await authService.validateUser('test@test.com', result.password);

      expect(user).toBeDefined();
      expect(user.email).toEqual(result.email);
      expect(user['password']).toBeUndefined();
    })

    it('should not validate user', async () => {
      let err;

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      try {
        await authService.validateUser('test@test.com', 'pass');
      } catch (error) {
        err = error;
      }

      expect(err).toBeDefined();
      expect(err.status).toEqual(400);
      expect(err.message).toEqual('Email or password incorrect');
    })

    it('should not validate user bcrypt throws error', async () => {
      let err;

      jest.spyOn(bcrypt, 'compare').mockRejectedValue(new InternalServerErrorException());

      try {
        await authService.validateUser('test@test.com', 'pass');
      } catch (error) {
        err = error;
      }

      expect(err).toBeDefined();
      expect(err.status).toEqual(400);
      expect(err.message).toEqual('Email or password incorrect');
    })
  })

  describe('uniqueEmail', () => {

    it('should return true', async () => {
      jest.spyOn(spyUsersService, 'findOne').mockResolvedValue(null);

      let uniqueEmail = await authService.uniqueEmail('test@test.com');

      expect(uniqueEmail).toBe(true);
    })

    it('should return false', async () => {
      jest.spyOn(spyUsersService, 'findOne').mockResolvedValue(result as IUser);

      let uniqueEmail = await authService.uniqueEmail('test@test.com');

      expect(uniqueEmail).toBe(false);
    })
  })

  describe('register', () => {

    const registerUser = {
      email: 'test@test.com',
      password: 'password',
    };

    it('should register the user and return it', async () => {
      jest.spyOn(authService, 'uniqueEmail').mockResolvedValue(true);
      jest.spyOn(spyUsersService, 'create').mockResolvedValue(result as IUser);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newHashedPassword');

      let res = await authService.register(registerUser);
      let newUser = res.user;
      let token = res.token;

      expect(token).toBeDefined();
      expect(newUser.email).toEqual(result.email);
      expect(newUser.firstName).toEqual(result.firstName);
      expect(newUser.lastName).toEqual(result.lastName);
      expect(newUser.password).toEqual(result.password);
    })

    it('should register the user and return it', async () => {
      jest.spyOn(authService, 'uniqueEmail').mockResolvedValue(false);
      jest.spyOn(spyUsersService, 'create').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newHashedPassword');

      let newUser = await authService.register(registerUser);

      expect(newUser).toBeNull();
    })
  })

  describe('login', () => {

    const loginResponse = {
      email: 'test@test.com',
      password: 'password'
    };

    it('should login user and return auth token', async () => {

      jest.spyOn(spyUsersService, 'findOne').mockResolvedValue(result as IUser);
      jest.spyOn(spyUsersService, 'updateLogin');

      let auth = await authService.login(loginResponse);

      expect(auth).toBeDefined();
      expect(auth.token).toBeDefined();
      expect(auth.user).toBeDefined();
    })
  })
})