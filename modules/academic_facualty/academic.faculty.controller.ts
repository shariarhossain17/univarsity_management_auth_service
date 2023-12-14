import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
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

export default {
  createFaculty,
};
