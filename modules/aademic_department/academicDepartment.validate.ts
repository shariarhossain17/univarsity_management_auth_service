import { z } from 'zod';

const departmentValidate = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    academicFaculty: z.string({
      required_error: 'academicFaculty is required',
    }),
  }),
});
const departmentUpdateValidate = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export default {
  departmentValidate,
  departmentUpdateValidate,
};
