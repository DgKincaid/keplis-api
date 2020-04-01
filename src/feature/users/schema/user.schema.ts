import { object, string } from '@hapi/joi';

export const UserSchema = object({
  _id: string()
    .required(),

  email: string()
    .optional(),

  firstName: string()
    .optional(),

  lastName: string()
    .optional(),
})