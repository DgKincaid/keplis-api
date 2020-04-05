import { Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  owners: Map<string, string>;

  createdDttm: Date;
  updatedDttm: Date;
  removedDttm: Date;
}