import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { GroupDbService } from './group-db.service';

describe('GroupDbService', () => {
  let service: GroupDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupDbService,
        {
          provide: getModelToken('Group'),
          useFactory: () => ({ })
        }
      ],
    }).compile();

    service = module.get<GroupDbService>(GroupDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
