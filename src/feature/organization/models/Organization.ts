import { Schema } from 'mongoose';

export const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },

  owner: { type: Schema.Types.ObjectId, ref: 'User' },

  group: { type: Schema.Types.ObjectId, ref: 'Group' },

  removedDttm: { type: Date },
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})