import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};
export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

export type ISearchparams = {
  searchParams?: string;
};
