import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

describe('Organization Controller', () => {
  let controller: OrganizationController;
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [
        {
          provide: OrganizationService,
          useFactory: () => ({

          })
        }
      ]
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
