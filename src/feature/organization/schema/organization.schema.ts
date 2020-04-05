import { object, string } from '@hapi/joi';

export const OrganizationSchema = object({
  name: string()
    .required(),
})