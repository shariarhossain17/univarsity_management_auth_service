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
  const result = (await departMentModel.create(payload)).populate(
    'academicFaculty',
  );
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
    .populate('academicFaculty')
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

const getSingleDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await departMentModel.findById(id).populate('academicFaculty');
  return result;
};
const deleteDepartmentById = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await departMentModel.findByIdAndDelete(id);
  return result;
};
const updateDepartmentById = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
  const result = await departMentModel
    .findByIdAndUpdate(id, payload, {
      new: true,
    })
    .populate('academicFaculty');
  return result;
};

export default {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleDepartment,
  deleteDepartmentById,
  updateDepartmentById,
};
