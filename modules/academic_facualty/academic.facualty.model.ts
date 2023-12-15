import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academic.facualty.interface';

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const faculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'Faculty',
  academicFacultySchema,
);
