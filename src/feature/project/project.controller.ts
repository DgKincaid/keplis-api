import { Controller, Get, Param, Post, UseGuards, Request, Body, UsePipes } from '@nestjs/common';

import { ProjectService } from './project.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards';

import { UserTokenGuard, UserOrgGuard } from '../../guards';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';

import { CreateProjectSchema } from './schema/create.schema';

@ApiTags('project')
@UseGuards(JwtAuthGuard, UserTokenGuard, UserOrgGuard)
@Controller('organization/:orgId/project')
export class ProjectController {
  constructor(private projectService: ProjectService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Find all projects in organization'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async findAll(@Param('orgId') organizationId) {

    return await this.projectService.findAll(organizationId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create project'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public async create(@Param('orgId') organizationId, @Body(new JoiValidationPipe(CreateProjectSchema)) body, @Request() req) {

    let user = req.user;

    return await this.projectService.create(user.userId, organizationId, body)
  }
}
