import { IPaginationOption } from '../../interface/paginationInterface';

import { SortOrder } from 'mongoose';
import ApiError from '../../errors/ApiError';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { facultySearchableField } from './faculty.constant';
import { IFaculty, ISearchParams } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFaculty = async (
  filter: ISearchParams,
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IFaculty[]>> => {
  const { searchParams, ...filterData } = filter;
  const addCondition = [];

  if (searchParams) {
    addCondition.push({
      $or: facultySearchableField.map(params => ({
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

  const result = await Faculty.find(withConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortData)
    .skip(skip)
    .limit(limit);

  const count = await Faculty.find({}).countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id);

  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(404, "user doese't exist");
  }

  const { name, ...studentData } = payload;

  const updateFacultyData: Partial<IFaculty> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  });

  return result;
};

export default {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
