import config from '../../config/index';
import ApiError from '../../errors/ApiError';
import { generateStudentId } from '../../utils/user.utils';
import { academicSemester } from '../academi_semister/academic.semister.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';

export const createStudent = async (
  student: IStudent,
  userData: IUser,
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.student_default_password as string;
  }

  userData.role = 'student';

  const academicSemesterById = await academicSemester.findById(
    student.academicSemester,
  );

  const id = await generateStudentId(academicSemesterById);

  userData.id = id;
  const user = await User.create(userData);
  if (!user) {
    throw new ApiError(400, 'Failed to create user');
  }
  return user;
};

export default {
  createStudent,
};
