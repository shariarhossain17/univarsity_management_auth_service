import { z } from 'zod';

const managementDepartmentSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});
const updateManagementDepartmentSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
  }),
});

export default {
  managementDepartmentSchema,
  updateManagementDepartmentSchema,
};
