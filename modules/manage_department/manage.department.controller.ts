import { Request, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import { filterKeys } from './manage.department.costant';
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
    const paginationOptions = pick(req.query, keys);
    const filters = pick(req.query, filterKeys);
    const result = await manageDepartmentServices.getAllManagementDepartment(
      filters,
      paginationOptions,
    );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrieved success!!',
      meta: result.meta,
      result: result.data,
    });
  },
);
const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await manageDepartmentServices.getSingleManagementDepartment(
      req.params.id,
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrieved success!!',
      result: result,
    });
  },
);
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await manageDepartmentServices.deleteManagementDepartment(
      req.params.id,
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'management department delete success!!',
      result: result,
    });
  },
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await manageDepartmentServices.updateManagementDepartment(
      req.params.id,
      req.body,
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'management department delete success!!',
      result: result,
    });
  },
);

export default {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
};
