import { Request, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import { filterKeys } from '../academi_semister/academicsemester.constatnt';
import { IAcademicFaculty } from './academic.facualty.interface';
import facultyService from './academic.faculty.services';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.createFaculty(req.body);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'faculty create successfully!!',
    result: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, keys);
  const searchFilter = pick(req.query, filterKeys);
  const result = await facultyService.getAllFaculty(
    searchFilter,
    paginationOptions,
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'faculty get successfully!!',
    meta: result.meta,
    result: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.getSingleFaculty(req.params.id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'data retrieve successfully!!',
    result: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.deleteFaculty(req.params.id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'faculty delete successfully!!',
    result: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.updateFaculty(req.params.id, req.body);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'faculty updated successfully!!',
    result: result,
  });
});

export default {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
