import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';

import { GroupsService } from './groups.service';
import { IGroup, GroupDbService } from '../../db';

describe('GroupsService', () => {
  let service: GroupsService;

  let createGroup = {
    name: faker.name.lastName(),
    owners: [faker.random.uuid()],
    createdDttm: faker.date.past(),
    updatedDttm: faker.date.recent(),
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: GroupDbService,
          useFactory: () => ({
            create: jest.fn(() => createGroup)
          })
        }
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let reqGroup: Partial<IGroup> = {
      name: faker.name.jobTitle(),
      owners: new Map<string, string>()
    }

    reqGroup.owners.set(faker.random.uuid(), 'test');

    it('should create group', async () => {

      let newGroup = await service.create(reqGroup as IGroup);

      expect(newGroup).toBeDefined();
      expect(newGroup.name).toEqual(createGroup.name);
    })
  })
});
