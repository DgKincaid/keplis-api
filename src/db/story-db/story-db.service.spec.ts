import { Test, TestingModule } from '@nestjs/testing';
import { StoryDbService } from './story-db.service';
import { getModelToken } from '@nestjs/mongoose';

describe('StoryDbService', () => {
  let service: StoryDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoryDbService,
        {
          provide: getModelToken('Story'),
          useFactory: () => ({})
        }
      ],
    }).compile();

    service = module.get<StoryDbService>(StoryDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
