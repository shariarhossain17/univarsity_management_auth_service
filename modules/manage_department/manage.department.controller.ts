import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { IManagementDepartment } from './manage.department.interface';
import manageDepartmentServices from './manage.department.services';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await manageDepartmentServices.createManagementDepartment(
      req.body,
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'manage departments create successfully!!',
      result: result,
    });
  },
);
const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await manageDepartmentServices.getAllManagementDepartment();

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrieved success!!',
      result: result,
    });
  },
);

export default {
  createManagementDepartment,
  getAllManagementDepartment,
};
