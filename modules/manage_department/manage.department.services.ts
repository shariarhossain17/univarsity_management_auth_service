import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import { ISearchParams } from '../admin/admin.interface';
import { searchParamsFields } from './manage.department.costant';
import { IManagementDepartment } from './manage.department.interface';
import { ManagementDepartment } from './management.department.model';

const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);

  return result;
};

const getAllManagementDepartment = async (
  filter: ISearchParams,
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IManagementDepartment[]>> => {
  const { searchParams, ...filterData } = filter;

  const addCondition = [];
  if (searchParams) {
    addCondition.push({
      $or: searchParamsFields.map(params => ({
        [params]: {
          $regex: searchParams,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    addCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortData: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortData[sortBy] = sortOrder;
  }

  const withConditions = addCondition.length > 0 ? { $and: addCondition } : {};
  const result = await ManagementDepartment.find(withConditions)
    .sort(sortData)
    .skip(skip)
    .limit(limit);

  const count =
    await ManagementDepartment.find(withConditions).countDocuments();

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
