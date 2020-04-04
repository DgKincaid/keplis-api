import { Schema } from 'mongoose';

export const StorySchema: Schema = new Schema({
  title: { type: String },
  description: { type: String },
  type: { type: String },
  status: { type: String },

  effort: { type: Number },

  acceptance_criteria: { type: String },

  project: { type: Schema.Types.ObjectId, ref: 'Project' },

  comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ],

  tasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ],

  sprint: { type: Schema.Types.ObjectId, ref: 'Sprint' },

  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },

  group: { type: Schema.Types.ObjectId, ref: 'Group' },

  links: [
    { type: Schema.Types.ObjectId, ref: 'Story' },
    { type: String },
  ]
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})