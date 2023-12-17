import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import {
  IAcademicDepartment,
  ISearchparams,
} from './academicDepartment.interface';
import { departMentModel } from './academicDepartment.model';

const createAcademicDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await departMentModel.create(payload);
  return result;
};

const getAllAcademicDepartment = async (
  filterField: ISearchparams,
  paginationOptions: IPaginationOption,
): Promise<IgenericResponse<IAcademicDepartment[]>> => {
  const { searchParams, ...filterData } = filterField;

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
  const result = await departMentModel
    .find(withConditions)
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
