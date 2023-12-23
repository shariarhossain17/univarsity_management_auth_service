import { Schema, model } from 'mongoose';
import ApiError from '../../errors/ApiError';
import {
  AcademicSemester,
  IAcademicSemester,
} from './academic.semister.interface';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicsemester.constatnt';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },
  { timestamps: true },
);

academicSemesterSchema.pre('save', async function () {
  const isExist = await academicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(409, 'semester already exist');
  }
});

export const academicSemester = model<IAcademicSemester, AcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);
