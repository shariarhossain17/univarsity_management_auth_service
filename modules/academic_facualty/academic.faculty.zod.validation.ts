import { z } from 'zod';

const createFacultySchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export default {
  createFacultySchema,
};
