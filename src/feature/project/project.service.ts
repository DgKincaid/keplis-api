import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IUser, IProject, ProjectDbService } from '../../db';

@Injectable()
export class ProjectService {

  constructor(
    private projectDbService: ProjectDbService
  ) { }

  public async findAll(organizationId: string) {
    let projects;

    try {
      projects = await this.projectDbService.findAllByOrganization(organizationId);
    } catch (error) {
      console.log(error);
    }

    return projects;
  }

  public async findById(organizationId: string, projectId: string) {
    let project: IProject;

    try {
      project = await this.projectDbService.findOneById(projectId);

      if(project.organization !== organizationId) throw new UnauthorizedException();
    } catch (error) {
      console.log(error);
    }

    return project;
  }

  public async create(user: IUser, project: IProject) {

    if(!user.organizations.has(project.organization)) throw new UnauthorizedException();

    let newProject: IProject;

    try {
      project.createdBy = user._id;

      newProject = await this.projectDbService.create(project);

    } catch (error) {
      console.log(error);
    }

    return newProject;
  }
}
