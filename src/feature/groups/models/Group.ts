import { Schema } from 'mongoose';

export const GroupSchema: Schema = new Schema({
  name: { type: String, requireed: true },

  owners: { type: Map, of: Schema.Types.ObjectId, ref: 'User' },

  removedDttm: { type: Date },
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})