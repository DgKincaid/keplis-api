import { Injectable } from '@nestjs/common';

import { IGroup, GroupDbService } from '../../db';

@Injectable()
export class GroupsService {
  constructor(private groupDbService: GroupDbService) { }

  public async create(newGroup: IGroup) {
    let group: IGroup;

    try {
      group = await this.groupDbService.create(newGroup);
    } catch (error) {
      console.log(error);
    }

    return group;
  }
}
