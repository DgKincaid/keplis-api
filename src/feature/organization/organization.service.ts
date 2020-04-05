import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IOrganization } from './interfaces/IOrganization';
import { GroupsService } from '../groups/groups.service';
import { IGroup } from '../groups/interfaces/IGroup';
import { CreateOrganizationDto } from './dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel('Organization') private organizationModel: Model<IOrganization>,
    private groupService: GroupsService,
    private usersService: UsersService
  ) { }

  public async create(createOrg: CreateOrganizationDto, userId: string) {
    let organization;
    let newGroup = { name: createOrg.name, owners: new Map()};

    newGroup.owners.set(userId, userId);

    try {

      let group = await this.groupService.create(newGroup as IGroup);

      let newOrg: Partial<IOrganization> = {
        name: createOrg.name,
        owner: userId,
        group: group._id
      };

      organization = await this.organizationModel.create(newOrg);

      this.usersService.addOrganization(userId, organization.id);
      this.usersService.addGroup(userId, group.id);

    } catch (error) {
      console.log(error);
    }

    return organization;
  }

  public async findAll() {
    let organizations: IOrganization[];

    try {
      organizations = await this.organizationModel.find({});

    } catch (error) {
      console.log(error);
    }

    return organizations;
  }

  public async findById(id: string) {
    let organization: IOrganization;

    try {
      organization = await this.organizationModel.findById(id);

    } catch (error) {
      console.log(error);
    }

    return organization;
  }
}
