import { Document } from 'mongoose';

export interface ISprint extends Document {
  name: string;
  startDttm: Date;
  endDttm: Date;

  createdDttm: Date;
  updatedDttm: Date;
}