import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academic_facualty/academic.facualty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  synchId: string;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type ISearchparams = {
  searchParams?: string;
};

export type IAcademicDepartmentEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};
