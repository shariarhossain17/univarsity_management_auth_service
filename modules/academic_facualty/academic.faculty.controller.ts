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

export default {
  createFaculty,
  getAllFaculty,
};
