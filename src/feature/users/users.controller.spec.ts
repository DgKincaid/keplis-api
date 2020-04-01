import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IUser } from './interfaces/IUser';

jest.mock('./users.service')
describe('Users Controller', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService
      ]
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const result = [
      { _id: 1 },
      { _id: 2 }
    ];

    it('should return list of users', async () => {
      jest.spyOn(usersService, 'findAll').mockResolvedValue(result as IUser[]);

      let users = await controller.findAll();

      expect(users).toBeDefined();
      expect(users.length).toBe(2);
    })
  })

  describe('findOne', () => {
    const result = { _id: 2 };

    it('should find user by id', async () => {
      jest.spyOn(usersService, 'findOneById').mockResolvedValue(result as IUser);

      let user = await controller.findOne('2');

      expect(user).toBeDefined();
      expect(user._id).toBe(2);
    })
  })

  describe('update', () => {
    const result = {
      _id: 2,
      email: 'john@comcast.com',
      firstName: 'John',
      lastName: 'Wick',
      password: 'password1234'
    };

    const request = {
      _id: 2,
      email: 'john@comcast.com',
      firstName: 'John',
      lastName: 'Wick',
      password: 'password1234'
    };

    it('should find user by id', async () => {
      jest.spyOn(usersService, 'updateUser').mockResolvedValue(result as IUser);

      let user = await controller.update(request);

      expect(user).toBeDefined();
      expect(user._id).toBe(2);
    })
  })
});
