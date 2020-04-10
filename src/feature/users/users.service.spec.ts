import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserDbService } from '../../db/user-db/user-db.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [
      ],
      providers: [
        UsersService,
        {
          provide: UserDbService,
          useFactory: () => ({

          })
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
