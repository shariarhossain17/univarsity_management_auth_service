import { SortOrder } from 'mongoose';
import {
  IgenericResponse,
  paginationHelper,
} from '../../helper/paginationHelper';
import { IPaginationOption } from '../../interface/paginationInterface';
import { IAcademicFaculty } from './academic.facualty.interface';
import { AcademicFaculty } from './academic.facualty.model';
import { ISearchparams } from './academic.faculty.interface';

const createFaculty = async (
  data: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(data);
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
  const result = await AcademicFaculty.find(withConditions)
    .sort(sortData)
    .skip(skip)
    .limit(limit);
  const count = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payLoad: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payLoad, {
    new: true,
  });
  return result;
};

export default {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
