import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
  syncId: string;
};
export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyEvent = {
  id: string;
  title: string;
  createdAt: string;
  updateAt: string;
};
