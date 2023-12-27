import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { IStudent } from './student.interface';
import studentServices from './student.services';
const getAllStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await studentServices.getAllStudent();

    sendResponse<IStudent[]>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      meta: {
        page: 1,
        limit: 1,
        count: 1,
      },
      result: result,
    });
  },
);

export default {
  getAllStudent,
};
