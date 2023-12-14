import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academic.facualty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const faculty = model<IAcademicFaculty>(
  'faculty',
  academicFacultySchema,
);
