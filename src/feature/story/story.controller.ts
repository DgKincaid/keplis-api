import { Controller, UseGuards, Get, Param, Request, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards';

import { UserTokenGuard, UserOrgGuard } from '../../guards';

import { StoryService } from './story.service';

@ApiTags('story')
@UseGuards(JwtAuthGuard, UserTokenGuard, UserOrgGuard)
@Controller('organization/:orgId/story')
export class StoryController {

  constructor(private storyService: StoryService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Find all stories in organization'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async findAll(@Param('orgId') organizationId, @Request() req) {
    let userId = req.user.userId;

    return await this.storyService.findAll(organizationId, userId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create story'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async create(@Param('orgId') organizationId, @Body() body, @Request() req) {
    let userId = req.user.userId;

    return await this.storyService.create(organizationId, userId, body);
  }
}
