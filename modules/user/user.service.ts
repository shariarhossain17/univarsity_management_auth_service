import mongoose from 'mongoose';
import config from '../../config/index';
import ApiError from '../../errors/ApiError';
import { IAcademicSemester } from '../academi_semister/academic.semister.interface';
import { academicSemester } from '../academi_semister/academic.semister.model';
import { IAdmin } from '../admin/admin.interface';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

export const createStudent = async (
  student: IStudent,
  userData: IUser,
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.student_default_password as string;
  }

  userData.role = 'student';
  const academicSemesterById = await academicSemester
    .findById(student.academicSemester)
    .lean();

  let newUserData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(
      academicSemesterById as IAcademicSemester,
    );

    userData.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(400, 'Failed to create student');
    }

    userData.student = newStudent[0]._id;

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ApiError(400, 'Failed to create user');
    }

    newUserData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserData;
};
export const createAdmin = async (admin: IAdmin, userData: IUser) => {
  if (!userData.password) {
    userData.password = config.admin_default_password as string;
  }

  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
export default {
  createStudent,
};
