import { Request, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
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

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'department create successfully!!',
      meta: result.meta,
      result: result.data,
    });
  },
);

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentService.getSingleDepartment(
    req.params.id,
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'department retrieve successfully!!',
    result: result,
  });
});
const deleteDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentService.deleteDepartmentById(
    req.params.id,
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'department delete successfully!!',
    result: result,
  });
});
const updateDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const result = await academicDepartmentService.updateDepartmentById(
    req.params.id,
    req.body,
  );
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'department update successfully!!',
    result: result,
  });
});

export default {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleDepartment,
  deleteDepartmentById,
  updateDepartmentById,
};
