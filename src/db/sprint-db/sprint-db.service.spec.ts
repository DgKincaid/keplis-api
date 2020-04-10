import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { SprintDbService } from './sprint-db.service';

describe('SprintDbService', () => {
  let service: SprintDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprintDbService,
        {
          provide: getModelToken('Sprint'),
          useFactory: () => ({
          })
        }
      ],
    }).compile();

    service = module.get<SprintDbService>(SprintDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
