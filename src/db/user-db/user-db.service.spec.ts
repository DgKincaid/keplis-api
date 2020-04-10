import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UserDbService } from './user-db.service';

describe('UserDbService', () => {
  let service: UserDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDbService,
        {
          provide: getModelToken('User'),
          useFactory: () => ({

          })
        }
      ],
    }).compile();

    service = module.get<UserDbService>(UserDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
