import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import { IAcademicFaculty } from './academic.facualty.interface';
import { faculty } from './academic.facualty.model';
import { ISearchparams } from './academic.faculty.interface';

const createFaculty = async (
  data: string,
): Promise<IAcademicFaculty | null> => {
  const result = await faculty.create(data);
  return result;
};
const getAllFaculty = async (
  filter: ISearchparams,
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IAcademicFaculty[]>> => {
  const { searchParams, ...filterData } = filter;
  const addCondition = [];

  if (searchParams) {
    addCondition.push({
      $or: [
        {
          title: {
            $regex: searchParams,
            $options: 'i',
          },
        },
      ],
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
  const result = await faculty
    .find(withConditions)
    .sort(sortData)
    .skip(skip)
    .limit(limit);
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
