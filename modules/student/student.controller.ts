import { Request, RequestHandler, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import studentServices from './student.services';
const getAllStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, keys);

    const filterKeys = pick(req.query, studentFilterableFields);

    const result = await studentServices.getAllStudent(
      filterKeys,
      paginationOptions,
    );

    sendResponse<IStudent[]>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      meta: result.meta,
      result: result.data,
    });
  },
);

const getSingleStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await studentServices.getSingleStudent(req.params.id);
    sendResponse<IStudent>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      result: result,
    });
  },
);

export default {
  getAllStudent,
  getSingleStudent,
};
