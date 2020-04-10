import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProject } from './interfaces/IProject';

import { IUser } from '../../db/user-db/IUser';

@Injectable()
export class ProjectService {

  constructor(
    @InjectModel('Project') private projectModel: Model<IProject>,
  ) { }

  public async findAll(organizationId: string) {
    let projects;

    try {
      projects = await this.projectModel.find({ organization: organizationId })
    } catch (error) {
      console.log(error);
    }

    return projects;
  }

  public async findById(organizationId: string, projectId: string) {
    let project: IProject;

    try {
      project = await this.projectModel.findById(projectId);

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

      newProject = await this.projectModel.create(project);

    } catch (error) {
      console.log(error);
    }

    return newProject;
  }
}
