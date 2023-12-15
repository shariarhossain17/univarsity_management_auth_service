import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academic_facualty/academic.facualty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
