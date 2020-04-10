import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string,
  firstName: string,
  lastName: string,
  password: string,

  groups: Map<string, string>,
  organizations: Map<string, string>,

  createdDttm: Date;
  updatedDttm: Date;
  lastLoginDttm: Date;
  removedDttm: Date;
}