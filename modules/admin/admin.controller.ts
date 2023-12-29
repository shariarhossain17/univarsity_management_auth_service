import { Request, RequestHandler, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import { adminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import adminServices from './admin.services';

const getAllAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, keys);

    const filterKeys = pick(req.query, adminFilterableFields);

    const result = await adminServices.getAllAdmin(
      filterKeys,
      paginationOptions,
    );

    sendResponse<IAdmin[]>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      meta: result.meta,
      result: result.data,
    });
  },
);

const getSingleAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminServices.getSingleAdmin(req.params.id);
    sendResponse<IAdmin>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrieve success!!',
      result: result,
    });
  },
);
const deleteAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminServices.deleteAdmin(req.params.id);
    sendResponse<IAdmin>(res, {
      statusCode: 200,
      success: true,
      message: 'data deleted successfully!!',
      result: result,
    });
  },
);
const updateAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminServices.updateAdmin(req.params.id, req.body);
    sendResponse<IAdmin>(res, {
      statusCode: 200,
      success: true,
      message: 'data updated successfully!!',
      result: result,
    });
  },
);

export default {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
