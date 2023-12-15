import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import { IAcademicFaculty } from './academic.facualty.interface';
import { faculty } from './academic.facualty.model';

const createFaculty = async (
  data: string,
): Promise<IAcademicFaculty | null> => {
  const result = await faculty.create(data);
  return result;
};
const getAllFaculty = async (
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IAcademicFaculty[]>> => {
  const addCondition = [];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortData: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortData[sortBy] = sortOrder;
  }

  const result = await faculty.find({}).sort(sortData).skip(skip).limit(limit);
  const count = await faculty.countDocuments();

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
  createFaculty,
  getAllFaculty,
};
