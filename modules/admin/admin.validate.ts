import { z } from 'zod';
import { bloodGroup, gender } from './admin.constant';

const createAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email' })
      .optional(),
    gender: z.enum([...(gender as [string, ...string[]])]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...(bloodGroup as [string, ...string[]])]).optional(),

    manageDepartment: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export default createAdminZodSchema;
