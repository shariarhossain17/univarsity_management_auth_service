import { SortOrder } from 'mongoose';
import ApiError from '../../errors/ApiError';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import {
  IAcademicSemester,
  IAcademicSemesterEvent,
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

export const updateAcademicSemesterService = async (
  id: string,
  payLoad: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  if (
    payLoad.code &&
    payLoad.title &&
    payLoad.code !== validSemesterCode[payLoad.title]
  ) {
    throw new ApiError(400, 'semester code invalid');
  }
  const result = await academicSemester.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  });

  return result;
};

export const deleteSemesterByIdService = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = academicSemester.findByIdAndDelete(id);
  return result;
};

export const createSemesterFromEvents = async (
  e: IAcademicSemesterEvent,
): Promise<IAcademicSemester> => {
  const result = await academicSemester.create({
    title: e.title,
    year: e.year,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  });

  return result;
};

export const updateSemesterFromEvents = async (
  e: IAcademicSemesterEvent,
): Promise<IAcademicSemester | null> => {
  const updatedSemester = await academicSemester.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: {
        title: e.title,
        year: e.year,
        code: e.code,
        startMonth: e.startMonth,
        endMonth: e.endMonth,
      },
    },
  );

  return updatedSemester;
};
