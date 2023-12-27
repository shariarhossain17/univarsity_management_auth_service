import { IPaginationOption } from '../../interface/paginationInterface';
import { ISearchParams, IStudent } from './student.interface';
import { Student } from './student.model';

import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { studentSearchableField } from './student.constant';

const getAllStudent = async (
  filter: ISearchParams,
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IStudent[]>> => {
  const { searchParams, ...filterData } = filter;
  const addCondition = [];

  if (searchParams) {
    addCondition.push({
      $or: studentSearchableField.map(params => ({
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

  const result = await Student.find(withConditions)
    .sort(sortData)
    .skip(skip)
    .limit(limit);

  const count = await Student.find({}).countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export default {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
