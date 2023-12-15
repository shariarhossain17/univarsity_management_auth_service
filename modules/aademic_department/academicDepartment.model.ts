import { Schema, Types, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';

const academicDepartMent = new Schema<
  IAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const departMentModel = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('Department', academicDepartMent);
