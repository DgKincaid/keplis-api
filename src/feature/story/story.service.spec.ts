import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';

import { StoryService } from './story.service';

describe('StoryService', () => {
  let service: StoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoryService,
        {
          provide: getModelToken('Story'),
          useFactory: () => ({

          })
        }
      ],
    }).compile();

    service = module.get<StoryService>(StoryService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {

    test('should return array of stories', () => {

    })
  })
});
