import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IStory } from './interfaces/IStory';
import { IUser } from '../../db/user-db/IUser';

import { IOrganization } from '../organization/interfaces/IOrganization';

@Injectable()
export class StoryService {

  constructor(
    @InjectModel('Story') private storyModel: Model<IStory>,
  ) { }

  public async findAll(organizationId: string, user: IUser) {
    let stories: IStory[] = [];

    try {

      //TODO: might be a perf hit
      stories = await this.storyModel.find({ organization: organizationId }).exec((err, obj) => {
        return obj.map(s => user.groups.has(s.group));
      })

    } catch (error) {
      console.log(error);
    }

    return stories;
  }

  public async findById(organizationId: string, storyId: string, user: IUser) {
    let story: IStory;

    try {
      story = await this.storyModel.findById(storyId);

      if(story.organization !== organizationId || !user.groups.has(story.group)) {
        throw new UnauthorizedException();
      }

    } catch (error) {
      console.log(error);
    }

    return story;
  }

  public async create(organization: IOrganization, user: IUser, story: IStory) {

    let createdStory: IStory;

    story.tasks = new Map<string, string>();
    story.organization = organization._id;
    story.owner = user._id;
    story.updatedBy = user._id;
    story.updatedDttm = new Date();
    story.group = organization.group;

    try {
      createdStory = await this.storyModel.create(story);
    } catch (error) {
      console.log(error);
    }

    return createdStory;
  }

  public async update(organizationId: IOrganization, user: IUser, story: IStory) {

  }
}
