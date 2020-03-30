import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { IUser } from './interfaces/IUser';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<IUser>) {
  }

  public async findOne(email: string): Promise<IUser | undefined> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  public async findOnePassword(email: string): Promise<IUser | undefined> {
    const user = await this.userModel.findOne({ email }, '+password');
    return user;
  }

  public async create(user: IUser) {
    user.lastLoginDttm = new Date();

    return this.userModel.create(user);
  }

  public findAll() {
    return this.userModel.find();
  }

  public async updateLogin(id: string) {

    const user = await this.userModel.findOne({ _id: id });

    user.lastLoginDttm = new Date();

    await user.save();
  }
}
