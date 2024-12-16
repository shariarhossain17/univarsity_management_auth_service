import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicsemester.constatnt';

export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
      required_error: 'year is required',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'code is required',
    }),

    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'start-month is required',
    }),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'end-month is required',
    }),
  }),
});
export const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitle] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCode] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),

      startMonth: z
        .enum([...academicSemesterMonth] as [string, ...string[]], {
          required_error: 'start-month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonth] as [string, ...string[]], {
          required_error: 'end-month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data => (data.body.title && data.body.code) || (!data.body.title && data),
    {
      message: 'Either both title and code should be provide or neither',
    },
  );
