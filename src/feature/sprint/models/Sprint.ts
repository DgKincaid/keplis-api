import { Schema } from 'mongoose';

export const SprintSchema: Schema = new Schema({
  name: { type: String, required: true },

  startDttm: { type: Date, required: true },
  endDttm: { type: Date, required: true },
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})