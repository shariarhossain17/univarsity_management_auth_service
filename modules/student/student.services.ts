import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudent = async (): Promise<IStudent[]> => {
  const result = await Student.find({});

  return result;
};

export default {
  getAllStudent,
};
