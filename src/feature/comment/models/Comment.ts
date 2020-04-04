import { Schema } from 'mongoose';

export const CommentSchema: Schema = new Schema({
  text: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})