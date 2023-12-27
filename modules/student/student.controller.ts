import { Request, RequestHandler, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import { IStudent } from './student.interface';
import studentServices from './student.services';
const getAllStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, keys);

    const result = await studentServices.getAllStudent(paginationOptions);

    sendResponse<IStudent[]>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      meta: result.meta,
      result: result.data,
    });
  },
);

export default {
  getAllStudent,
};
