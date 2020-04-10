import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { UserTokenGuard } from '../../guards/user-token/user-token.guard';
import { UserTokenService } from '../../guards/user-token/user-token.service';

describe('Project Controller', () => {
  let controller: ProjectController;
  let projectService: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
      ],
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useFactory: () => ({ })
        },
        {
          provide: UserTokenGuard,
          useFactory: () => ({ })
        },
        {
          provide: UserTokenService,
          useFactory: () => ({ })
        },
      ]
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
