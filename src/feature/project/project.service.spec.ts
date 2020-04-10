import { Test, TestingModule } from '@nestjs/testing';

import * as faker from 'faker';

import { ProjectService } from './project.service';

import { ProjectDbService, IUser, IProject } from '../../db';

describe('ProjectService', () => {

  let project = {
    name: faker.commerce.productName(),
    organization: faker.random.uuid(),
    createdBy: faker.random.uuid(),
    createdDttm: faker.date.past(),
    updatedDttm: faker.date.recent(),
  }

  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: ProjectDbService,
          useFactory: () => ({
            findAllByOrganization: jest.fn(() => [project]),
            findOneById: jest.fn(() => project),
            create: jest.fn(() => project)
          })
        }
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {

    test('should be defined', async () => {
      let newProject = await service.findAll('234234');

      expect(newProject).toBeDefined();
    })
  })

  describe('findById', () => {

    test('should be defined', async () => {
      let found = await service.findById(project.organization, '12312');

      expect(found).toBeDefined();
    })
  })

  describe('create', () => {

    test('should be defined', async () => {
      let user = {
        _id: faker.random.uuid(),
        organizations: new Map<string, string>()
      }

      user.organizations.set(project.organization, project.organization);

      let found = await service.create(user as IUser, project as IProject);

      expect(found).toBeDefined();
    })
  })
});
