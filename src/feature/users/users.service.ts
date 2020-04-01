import { Injectable, BadRequestException } from '@nestjs/common';
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

  public async findOneById(id: string): Promise<IUser | undefined> {
    const user = await this.userModel.findById(id);

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

  // Not allowing user to update sensitive data that will be taken care of in auth
  public async updateUser(user: IUser) {
    const { firstName, lastName } = user;
    console.log(firstName, lastName);
    let currentUser = await this.userModel.findById(user._id);

    if(!currentUser) throw new BadRequestException('User not found');

    let updatedUser;

    if(firstName != null) {
      currentUser.firstName = firstName;
    }

    if(lastName != null) {
      currentUser.lastName = lastName;
    }

    currentUser.updatedDttm = new Date();

    try {
      updatedUser = await currentUser.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }

    return updatedUser;
  }
}
