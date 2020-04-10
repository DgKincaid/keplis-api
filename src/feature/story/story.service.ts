import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IUser, IStory, IOrganization, StoryDbService } from '../../db';

@Injectable()
export class StoryService {

  constructor(
    private storyDbService: StoryDbService
  ) { }

  public async findAll(organizationId: string, user: IUser) {
    let stories: IStory[] = [];

    try {

      let allStories = await this.storyDbService.findAllByOrganization(organizationId);

      stories = allStories.filter(story => user.groups.has(story.group))

    } catch (error) {
      console.log(error);
    }

    return stories;
  }

  public async findById(organizationId: string, storyId: string, user: IUser) {
    let story: IStory;

    try {
      story = await this.storyDbService.findOneById(storyId);

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
    story.organization = organization.id;
    story.owner = user._id;
    story.updatedBy = user._id;
    story.updatedDttm = new Date();
    story.group = organization.group;

    try {
      createdStory = await this.storyDbService.create(story);
    } catch (error) {
      console.log(error);
    }

    return createdStory;
  }

  public async update(organizationId: IOrganization, user: IUser, story: IStory) {

  }
}
