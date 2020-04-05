import { Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  owner: string;
  group: string;

  createdDttm: Date;
  updatedDttm: Date;
  removedDttm: string;
}