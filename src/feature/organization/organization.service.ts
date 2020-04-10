import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IOrganization } from './interfaces/IOrganization';
import { CreateOrganizationDto } from './dto';
import { GroupDbService, IGroup, UserDbService } from '../../db';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel('Organization') private organizationModel: Model<IOrganization>,
    private groupDbService: GroupDbService,
    private userDbService: UserDbService,
  ) { }

  public async create(createOrg: CreateOrganizationDto, userId: string) {
    let organization;
    let newGroup = { name: createOrg.name, owners: new Map()};

    newGroup.owners.set(userId, userId);

    try {

      let group = await this.groupDbService.create(newGroup as IGroup);

      let newOrg: Partial<IOrganization> = {
        name: createOrg.name,
        owner: userId,
        group: group._id
      };

      organization = await this.organizationModel.create(newOrg);

      let user = await this.userDbService.findOneById(userId);

      user = this.userDbService.addOrganization(user, organization.id);
      user = this.userDbService.addGroup(user, group.id);

      await this.userDbService.update(user);

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
