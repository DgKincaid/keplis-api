import { Test, TestingModule } from '@nestjs/testing';

import * as faker from 'faker';

import { OrganizationService } from './organization.service';

import { IGroup, GroupDbService, UserDbService, IOrganization, OrganizationDbService } from '../../db';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let spyGroupsService: GroupDbService;

  let createOrg: Partial<IOrganization> = {
    name: faker.company.companyName(),
    owner: faker.random.uuid(),
    group: '123123',
    createdDttm: faker.date.past(),
    updatedDttm: faker.date.recent(),
  };

  let createGroup: Partial<IGroup> = {
    _id: '123123123123'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: OrganizationDbService,
          useFactory: () => ({
            create: jest.fn(() => createOrg)
          })
        },
        {
          provide: GroupDbService,
          useFactory: () => ({
            create: jest.fn(() => createGroup)
          })
        },
        {
          provide: UserDbService,
          useFactory: () => ({
            findOneById: jest.fn(),
            update: jest.fn(),
            addOrganization: jest.fn(),
            addGroup: jest.fn()
          })
        }
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    spyGroupsService = module.get<GroupDbService>(GroupDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let testOrg: Partial<IOrganization> = {
      name: faker.company.companyName(),
      owner: faker.random.uuid(),
    };

    it('should create organization', async () => {
      let organization: IOrganization = await service.create(testOrg as IOrganization, '13123123');

      expect(organization).toBeDefined();
      expect(organization.group).toBeDefined();
      expect(organization.owner).toBeDefined();

      expect(spyGroupsService.create).toHaveBeenCalled();
    })
  })
});
