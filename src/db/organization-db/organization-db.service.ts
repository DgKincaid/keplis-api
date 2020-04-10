import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IOrganization } from './IOrganization';

@Injectable()
export class OrganizationDbService {

  constructor(
    @InjectModel('Organization') private organizationModel: Model<IOrganization>,
  ) { }

  public async create(org: IOrganization) {

    let newOrg: IOrganization;

    try {
      newOrg = await this.organizationModel.create(org);
    } catch (error) {
      console.log(error);
    }

    return newOrg;
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

  public async findOneById(id: string) {
    let organization: IOrganization;

    try {
      organization = await this.organizationModel.findById(id);
    } catch (error) {
      console.log(error);
    }
    return organization;
  }
}
