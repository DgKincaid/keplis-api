import { Document } from "mongoose";

export interface IProject extends Document {
  name: string;

  organization: string;

  createdBy: string;

  createdDttm: Date;
  updatedDttm: Date;
}