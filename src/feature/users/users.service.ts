import { Injectable, BadRequestException, NotImplementedException } from '@nestjs/common';

import { UserDbService } from 'src/db/user-db/user-db.service';
import { IUser } from '../../db/user-db/IUser';

@Injectable()
export class UsersService {

  constructor(private userDbService: UserDbService) {
  }

  public async findOne(email: string): Promise<IUser | undefined> {
    const user = await this.userDbService.findOneByEmail(email);

    return user;
  }

  public async findOnePassword(email: string): Promise<IUser | undefined> {
    // const user = await this.userModel.findOne({ email }, '+password');
    // return user;

    const user = await this.userDbService.findOneByEmailPass(email);

    return user;
  }

  public async findOneById(id: string): Promise<IUser | undefined> {
    // const user = await this.userModel.findById(id);

    // return user;

    const user = await this.userDbService.findOneById(id);

    return user;
  }

  public async create(user: IUser) {

    user.lastLoginDttm = new Date();
    user.organizations = new Map();
    user.groups = new Map();

    let createdUser = await this.userDbService.create(user);

    return createdUser;
  }

  public findAll() {
    throw new NotImplementedException();
  }

  public async updateLogin(id: string) {

    const user = await this.userDbService.findOneById(id);

    user.lastLoginDttm = new Date();

    await this.userDbService.update(user);
  }

  // Not allowing user to update sensitive data that will be taken care of in auth
  public async updateUser(user: IUser) {
    const { firstName, lastName } = user;

    let updatedUser: IUser;

    try {
      let currentUser = await this.userDbService.findOneById(user._id);

      if(!currentUser) throw new BadRequestException('User not found');

      if(firstName != null) {
        currentUser.firstName = firstName;
      }

      if(lastName != null) {
        currentUser.lastName = lastName;
      }

      updatedUser = await this.userDbService.update(currentUser);

    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }

    return updatedUser;
  }

  public async addOrganization(id: string, organizationId: string) {

    try {
      let user: IUser = await this.userDbService.findOneById(id);

      user.organizations.set(organizationId, organizationId);

      await this.userDbService.update(user);
    } catch (error) {
      console.log(error);
    }

    return;
  }

  public async addGroup(id: string, groupId: string) {
    try {
      let user: IUser = await this.userDbService.findOneById(id);

      user.groups.set(groupId, groupId);

      await this.userDbService.update(user);
    } catch (error) {
      console.log(error);
    }

    return;
  }
}
