import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IUser, IStory, IOrganization, StoryDbService, UserDbService, OrganizationDbService } from '../../db';

@Injectable()
export class StoryService {

  constructor(
    private storyDbService: StoryDbService,
    private userDbService: UserDbService,
    private organizationDbService: OrganizationDbService,
  ) { }

  public async findAll(organizationId: string, userId: string) {
    let stories: IStory[] = [];

    try {
      let user = await this.userDbService.findOneById(userId);
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

  public async create(organizationId: string, userId: string, story: IStory) {

    let createdStory: IStory;

    try {
      let user = await this.userDbService.findOneById(userId);
      let organization = await this.organizationDbService.findOneById(organizationId);

      story.tasks = new Map<string, string>();

      story.organization = organization.id;
      story.owner = user._id;
      story.updatedBy = user._id;
      story.group = organization.group;

      story.updatedDttm = new Date();

      createdStory = await this.storyDbService.create(story);
    } catch (error) {
      console.log(error);
    }

    return createdStory;
  }

  public async update(organizationId: IOrganization, user: IUser, story: IStory) {

  }
}
