import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IGroup } from './interfaces/IGroup';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel('Group') private groupModel: Model<IGroup>
  ) { }

  public async create(newGroup: IGroup) {
    let group: IGroup;

    try {
      group = await this.groupModel.create(newGroup);
    } catch (error) {
      console.log(error);
    }

    return group;
  }
}
