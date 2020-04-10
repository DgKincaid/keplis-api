import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { IUser } from './IUser';

@Injectable()
export class UserDbService {

  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  public async findOneByEmail(email: string) {
    if(!email) return null;

    let user: IUser;

    try {
      user = await this.userModel.findOne({ email });
    } catch (error) {
      console.log(error);
    }

    return user;
  }

  public async findOneByEmailPass(email: string) {

    if(!email) return null;

    let user: IUser;

    try {
      user = await this.userModel.findOne({email}, '+password');

    } catch (error) {
      console.log(error);
    }
    return user;
  }

  public async findOneById(id: string) {
    if(!id) return null;

    let user: IUser;

    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      console.log(error);
    }

    return user;
  }

  public async create(user: IUser) {

    let newUser: IUser;

    try {
      newUser = await this.userModel.create(user);

      newUser.password = null;

    } catch (error) {
      console.log(error);
    }
    console.log(newUser);

    return newUser;
  }

  public async find() {

    let users: IUser[];

    try {
      users = await this.userModel.find();

    } catch (error) {
      console.log(error);
    }

    return users;
  }

  public async update(user: IUser) {
    try {
      //TODO: validate user
      user.save();

    } catch (error) {
      console.log(error);
    }

    return user;
  }

  public addOrganization(user: IUser, organizationId: string) {

    if (!user.organizations) {
      user.organizations = new Map<string, string>();
    }

    user.organizations.set(organizationId, organizationId);

    return user;
  }

  public addGroup(user: IUser, groupId: string) {

    if(!user.groups) {
      user.groups = new Map<string, string>();
    }

    user.groups.set(groupId, groupId);

    return user;
  }
}
