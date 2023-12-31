import { z } from 'zod';

const authZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const refreshZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh token is required',
    }),
  }),
});

export default {
  authZodSchema,
  refreshZodSchema,
};
