import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { ProjectDbService } from './project-db.service';

describe('ProjectDbService', () => {
  let service: ProjectDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectDbService,
        {
          provide: getModelToken('Project'),
          useFactory: () => ({
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn()
          })
        }
      ],
    }).compile();

    service = module.get<ProjectDbService>(ProjectDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
