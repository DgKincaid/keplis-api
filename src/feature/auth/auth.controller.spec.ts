import { Test } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ AuthController ],
      providers: [ AuthService ],
    }).compile();

    authController = moduleRef.get(AuthController);
    authService = moduleRef.get(AuthService);
  })

  describe('findAll', () => {
    it('should return an array of auths', async () => {
      const result = ['test'];

      expect(await authController.findAll()).toBe('this action returns all');
    })
  })
})