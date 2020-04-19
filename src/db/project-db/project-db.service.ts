import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProject } from './IProject';

@Injectable()
export class ProjectDbService {

  constructor(
    @InjectModel('Project') private projectModel: Model<IProject>,
  ) { }

  public async findAllByOrganization(orgId: string) {

    let projects: IProject[];

    try {
      projects = await this.projectModel.find({ organization: orgId })

    } catch (error) {
      console.log(error);
    }

    return projects;
  }

  public async findOneById(projectId: string) {
    let project: IProject;

    try {
      project = await this.projectModel.findById(projectId);
    } catch (error) {
      console.log(error);
    }
    return project;
  }

  public async create(project: IProject) {
    let newProject: IProject;

    try {
      newProject = await this.projectModel.create(project);

    } catch (error) {
      console.log(error);
    }

    return newProject;
  }
}
