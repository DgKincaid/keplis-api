import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    function mockUserModel(dto: any) {
      this.data = dto;
      this.save  = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
