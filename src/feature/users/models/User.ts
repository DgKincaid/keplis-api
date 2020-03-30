import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, select: false },
  removedDttm: { type: Date },
  lastLoginDttm: { type: Date },
}, {
  timestamps: { createdAt: 'createdDttm', updatedAt: 'updatedDttm' }
})

