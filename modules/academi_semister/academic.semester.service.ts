import { SortOrder } from 'mongoose';
import ApiError from '../../errors/ApiError';
import { paginationHelper } from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import {
  IAcademicSemester,
  ISearchparams,
} from './academic.semister.interface';
import { academicSemester } from './academic.semister.model';
import {
  searchParamsFields,
  validSemesterCode,
} from './academicsemester.constatnt';

export const createAcademicSemesterService = async (
  payLoad: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (payLoad.code !== validSemesterCode[payLoad.title]) {
    throw new ApiError(400, 'semester code invalid');
  }
  const result = await academicSemester.create(payLoad);

  return result;
};

type IgenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    count: number;
  };
  data: T;
};

export const getAllAcademicSemesterService = async (
  filter: ISearchparams,
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IAcademicSemester[]>> => {
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
  const result = await academicSemester
    .find(withConditions)
    .sort(sortData)
    .skip(skip)
    .limit(limit);

  const count = await academicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

export const getSingleAcademicService = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await academicSemester.findById(id);
  return result;
};
