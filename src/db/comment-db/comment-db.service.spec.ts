import { Test, TestingModule } from '@nestjs/testing';
import { CommentDbService } from './comment-db.service';

describe('CommentDbService', () => {
  let service: CommentDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentDbService],
    }).compile();

    service = module.get<CommentDbService>(CommentDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
