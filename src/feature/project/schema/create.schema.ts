import { object, string } from '@hapi/joi';

export const CreateProjectSchema = object({
  name: string()
    .required(),
})