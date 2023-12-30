import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import { IManagementDepartment } from './manage.department.interface';
import { ManagementDepartment } from './management.department.model';

const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);

  return result;
};

const getAllManagementDepartment = async (
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IManagementDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortData: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortData[sortBy] = sortOrder;
  }
  const result = await ManagementDepartment.find()
    .sort(sortData)
    .skip(skip)
    .limit(limit);

  const count = await ManagementDepartment.find().countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

export default {
  createManagementDepartment,
  getAllManagementDepartment,
};
