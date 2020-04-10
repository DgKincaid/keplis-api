import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IGroup } from './IGroup';

@Injectable()
export class GroupDbService {

  constructor(
    @InjectModel('Group') private groupModel: Model<IGroup>
  ) {}

  public async create(group: IGroup) {
    let newGroup: IGroup;

    try {
      newGroup = await this.groupModel.create(group);

    } catch (error) {
      console.log(error);
    }

    return newGroup
  }
}
