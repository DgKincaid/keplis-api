import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IUser } from '../../db/user-db/IUser';
import { UserDbService } from '../../db/user-db/user-db.service';

jest.mock('./users.service')
describe('Users Controller', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UserDbService,
          useFactory: () => ({

          })
        },
      ]
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

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
