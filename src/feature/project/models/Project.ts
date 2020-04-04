import { Schema } from 'mongoose';

export const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true }
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})
