import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards';
import { UserTokenGuard } from 'src/guards/user-token/user-token.guard';

@ApiTags('project')
@UseGuards(JwtAuthGuard, UserTokenGuard)
@Controller('organization/:orgId/project')
export class ProjectController {
  constructor(private projectService: ProjectService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Find all projects in organization'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async findAll(@Param('orgId') organizationId) {
    console.log(organizationId);

    return await this.projectService.findAll(organizationId);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Find all projects in organization'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async create(@Param('orgId') organizationId) {

    // return await this.projectService.create()
  }
}
