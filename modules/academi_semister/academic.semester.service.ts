import ApiError from '../../errors/ApiError';
import { IAcademicSemester } from './academic.semister.interface';
import { academicSemester } from './academic.semister.model';
import { validSemesterCode } from './academicsemester.constatnt';

export const createAcademicSemesterService = async (
  payLoad: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (payLoad.code !== validSemesterCode[payLoad.title]) {
    throw new ApiError(400, 'semester code invalid');
  }
  const result = await academicSemester.create(payLoad);

  return result;
};
