import { IPaginationOption } from '../../interface/paginationInterface';
import { IStudent } from './student.interface';
import { Student } from './student.model';

import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';

const getAllStudent = async (
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IStudent[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortData: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortData[sortBy] = sortOrder;
  }

  const result = await Student.find({}).sort(sortData).skip(skip).limit(limit);

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

export default {
  getAllStudent,
};
