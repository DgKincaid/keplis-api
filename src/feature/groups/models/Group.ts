import { Schema } from 'mongoose';

export const GroupSchema: Schema = new Schema({
  name: { type: String, requireed: true },
  owners: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})