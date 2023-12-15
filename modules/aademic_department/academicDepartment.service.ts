import { IAcademicDepartment } from './academicDepartment.interface';
import { departMentModel } from './academicDepartment.model';

const createAcademicDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await departMentModel.create(payload);
  return result;
};

export default {
  createAcademicDepartment,
};
