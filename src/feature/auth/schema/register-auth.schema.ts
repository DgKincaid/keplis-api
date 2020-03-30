import { object, string } from '@hapi/joi';

export const RegisterAuthSchema = object({
  email: string()
        .min(3)
        .max(30)
        .required(),

  password: string(),

  firstName: string(),

  lastName: string(),

})