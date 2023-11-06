import { Request, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import {
  createAcademicSemesterService,
  getAllAcademicSemesterService,
} from './academic.semester.service';
import { IAcademicSemester } from './academic.semister.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semesterData = req.body;
    const result = await createAcademicSemesterService(semesterData);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'user data crate successfully!!',
      result: result,
    });
  },
);

const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchParams']);
    const paginationOptions = pick(req.query, keys);

    const result = await getAllAcademicSemesterService(
      filters,
      paginationOptions,
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      meta: result.meta,
      result: result.data,
    });
  },
);

export default {
  createAcademicSemester,
  getAllAcademicSemester,
};
