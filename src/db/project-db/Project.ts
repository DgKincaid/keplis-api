import { Schema } from 'mongoose';

export const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },

  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },

  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})
