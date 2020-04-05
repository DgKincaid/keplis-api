import { Controller, Post, Body, Request, UsePipes, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { OrganizationService } from './organization.service';
import { OrganizationSchema } from './schema/organization.schema';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { JwtAuthGuard } from '../auth/guards';
import { CreateOrganizationDto } from './dto';

@ApiTags('organization')
@Controller('organization')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Find all organizations'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Find organization by id'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  public findOne(@Param('id') id) {
    return this.organizationService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The organization has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @UsePipes(new JoiValidationPipe(OrganizationSchema))
  public async create(@Request() req, @Body() organization: CreateOrganizationDto) {
    let currentUser = req.user;

    return await this.organizationService.create(organization, currentUser.userId);
  }
}
