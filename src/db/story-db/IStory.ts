import { Document } from 'mongoose';

export interface IStory extends Document {

  title: string;
  description: string;
  type: string;
  status: string;
  effort: number;
  acceptance_criteria: string;
  project: string;
  comments: string[];
  tasks: Map<string, string>;
  sprint: string;
  owner: string;
  assignedTo: string;
  updatedBy: string;
  group: string;
  organization: string;

  updatedDttm: Date,
  removedDttm: Date,
  createdDttm: Date;

  links: [{
      storyId: string,
      link: string
    }
  ]
}