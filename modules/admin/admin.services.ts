import { IPaginationOption } from '../../interface/paginationInterface';

import { SortOrder } from 'mongoose';
import ApiError from '../../errors/ApiError';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { adminSearchableField } from './admin.constant';
import { IAdmin, ISearchParams } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmin = async (
  filter: ISearchParams,
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IAdmin[]>> => {
  const { searchParams, ...filterData } = filter;
  const addCondition = [];

  if (searchParams) {
    addCondition.push({
      $or: adminSearchableField.map(params => ({
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
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortData: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortData[sortBy] = sortOrder;
  }
  const withConditions = addCondition.length > 0 ? { $and: addCondition } : {};

  const result = await Admin.find(withConditions)
    .populate('managementDepartment')
    .sort(sortData)
    .skip(skip)
    .limit(limit);

  const count = await Admin.find({}).countDocuments(withConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment');
  return result;
};
const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id).populate(
    'managementDepartment',
  );

  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(404, "user doese't exist");
  }

  const { name, ...studentData } = payload;

  const updateStudentData: Partial<IAdmin> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updateStudentData, {
    new: true,
  }).populate('managementDepartment');

  return result;
};

export default {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
