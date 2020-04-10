import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';


import { OrganizationDbService } from './organization-db.service';

describe('OrganizationDbService', () => {
  let service: OrganizationDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationDbService,
        {
          provide: getModelToken('Organization'),
          useFactory: () => ({
            save: jest.fn(),
            create: jest.fn()
          })
        },
      ],
    }).compile();

    service = module.get<OrganizationDbService>(OrganizationDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
