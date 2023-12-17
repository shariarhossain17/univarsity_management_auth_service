import { Request, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import { IgenericResponse } from '../../helper/paginationHelper';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import { academicDepartmentFiltrableField } from './academicDepartment.constant';
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

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filterParams = pick(req.query, academicDepartmentFiltrableField);
    const paginationOptions = pick(req.query, keys);
    const result = await academicDepartmentService.getAllAcademicDepartment(
      filterParams,
      paginationOptions,
    );

    sendResponse<IgenericResponse<IAcademicDepartment[]>>(res, {
      statusCode: 200,
      success: true,
      message: 'department create successfully!!',
      result: result,
    });
  },
);

export default {
  createAcademicDepartment,
  getAllAcademicDepartment,
};
