import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';

import { OrganizationService } from './organization.service';
import { IOrganization } from './interfaces/IOrganization';
import { OrganizationModule } from './organization.module';
import { GroupsService } from '../groups/groups.service';
import { IGroup } from '../groups/interfaces/IGroup';
import { UsersService } from '../users/users.service';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let spyGroupsService: GroupsService;

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
          provide: getModelToken('Organization'),
          useFactory: () => ({
            save: jest.fn(),
            create: jest.fn(() => createOrg)
          })
        },
        {
          provide: GroupsService,
          useFactory: () => ({
            create: jest.fn(() => createGroup)
          })
        },
        {
          provide: UsersService,
          useFactory: () => ({
            addOrganization: jest.fn(),
            addGroup: jest.fn()
          })
        }
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    spyGroupsService = module.get<GroupsService>(GroupsService);
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
