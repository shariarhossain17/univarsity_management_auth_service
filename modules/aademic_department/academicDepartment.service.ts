import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import { IAcademicDepartment } from './academicDepartment.interface';
import { departMentModel } from './academicDepartment.model';

const createAcademicDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await departMentModel.create(payload);
  return result;
};

const getAllAcademicDepartment = async (
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortData: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortData[sortBy] = sortOrder;
  }
  const result = await departMentModel
    .find({})
    .limit(limit)
    .skip(skip)
    .sort(sortData);

  const count = await departMentModel.countDocuments();

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
  createAcademicDepartment,
  getAllAcademicDepartment,
};
