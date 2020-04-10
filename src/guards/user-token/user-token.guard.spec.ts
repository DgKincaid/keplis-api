import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenGuard } from './user-token.guard';
import { UserTokenService } from './user-token.service';

describe('UserTokenService', () => {
  let service: UserTokenGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTokenGuard,
        {
          provide: UserTokenService,
          useFactory: () => ({ })
        }
      ],
    }).compile();

    service = module.get<UserTokenGuard>(UserTokenGuard);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
