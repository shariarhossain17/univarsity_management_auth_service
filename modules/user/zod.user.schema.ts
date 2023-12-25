import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First  Name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle  Name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last  Name is required',
        }),
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email({ message: 'please enter a valid email' }),
      gender: z.enum([...(gender as [string, ...string[]])], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      bloodGroup: z.enum([...(bloodGroup as [string, ...string[]])], {
        required_error: 'Blood group is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: ' Name is required',
        }),
        occupation: z.string({
          required_error: ' occupation is required',
        }),
        contactNo: z.string({
          required_error: ' contact number is required',
        }),
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export default createUserZodSchema;
