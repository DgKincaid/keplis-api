import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IStory } from './IStory';

@Injectable()
export class StoryDbService {

  constructor(
    @InjectModel('Story') private storyModel: Model<IStory>
  ) { }

  public async findAllByOrganization(orgId: string) {
    let stories: IStory[];

    try {
      stories = await this.storyModel.find({ organization: orgId });
    } catch (error) {
      console.log(error);
    }

    return stories;
  }

  public async findOneById(id: string) {
    let story: IStory;

    try {
      story = await this.storyModel.findById(id);
    } catch (error) {
      console.log(error);
    }
    return story;
  }

  public async create(story) {

    let newStory: IStory;

    try {
      newStory = await this.storyModel.create(story);

    } catch (error) {
      console.log(error);
    }
    return newStory;
  }
}
