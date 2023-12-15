import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import academicDepartmentService from './academicDepartment.service';
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result =
      await academicDepartmentService.createAcademicDepartment(payload);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'department create successfully!!',
      result: result,
    });
  },
);

export default {
  createAcademicDepartment,
};
