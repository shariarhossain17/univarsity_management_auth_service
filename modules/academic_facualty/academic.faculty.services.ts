import { IAcademicFaculty } from './academic.facualty.interface';
import { faculty } from './academic.facualty.model';

const createFaculty = async (
  data: string,
): Promise<IAcademicFaculty | null> => {
  const result = await faculty.create(data);
  return result;
};

export default {
  createFaculty,
};
