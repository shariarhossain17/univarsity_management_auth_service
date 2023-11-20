import { Request, Response } from 'express';
import { keys } from '../../constants/paginationContstants';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import pick from '../../utils/pick';
import {
  createAcademicSemesterService,
  getAllAcademicSemesterService,
  getSingleAcademicService,
} from './academic.semester.service';
import { IAcademicSemester } from './academic.semister.interface';
import { filterKeys } from './academicsemester.constatnt';

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
    const filters = pick(req.query, filterKeys);
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

const getSingleSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleAcademicService(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'data retrive success!!',
      result: result,
    });
  },
);

export default {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleSemesterById,
};
