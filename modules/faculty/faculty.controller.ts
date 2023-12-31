import { Request, RequestHandler, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import facultyServices from './faculty.services';

const getAllFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, keys);

    const filterKeys = pick(req.query, facultyFilterableFields);

    const result = await facultyServices.getAllFaculty(
      filterKeys,
      paginationOptions,
    );

    sendResponse<IFaculty[]>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      meta: result.meta,
      result: result.data,
    });
  },
);

const getSingleFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await facultyServices.getSingleFaculty(req.params.id);
    sendResponse<IFaculty>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      result: result,
    });
  },
);
const deleteFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await facultyServices.deleteFaculty(req.params.id);
    sendResponse<IFaculty>(res, {
      statusCode: 200,
      success: true,
      message: 'data deleted successfully!!',
      result: result,
    });
  },
);
const updateFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await facultyServices.updateFaculty(req.params.id, req.body);
    sendResponse<IFaculty>(res, {
      statusCode: 200,
      success: true,
      message: 'data updated successfully!!',
      result: result,
    });
  },
);

export default {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
