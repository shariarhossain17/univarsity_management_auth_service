import mongoose from 'mongoose';
import config from '../../config/index';
import ApiError from '../../errors/ApiError';
import { IAcademicSemester } from '../academi_semister/academic.semister.interface';
import { academicSemester } from '../academi_semister/academic.semister.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

import bcrypt from 'bcrypt';

export const createStudent = async (
  student: IStudent,
  userData: IUser,
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.student_default_password as string;
  }

  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.saltRounds),
  );

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
export const createFaculty = async (
  facultyData: IFaculty,
  userData: IUser,
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.faculty_default_password as string;
  }

  userData.role = 'faculty';

  let newUserData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generateFacultyId();

    facultyData.id = id;
    userData.id = id;

    const newFaculty = await Faculty.create([facultyData], { session });

    if (!newFaculty.length) {
      throw new ApiError(400, 'Failed to create faculty ');
    }

    userData.faculty = newFaculty[0]._id;

    const newUser = await User.create([userData], { session });

    if (!newFaculty.length) {
      throw new ApiError(400, 'Failed to create User ');
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
      path: 'faculty',
      populate: [
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
export const createAdmin = async (
  adminData: IAdmin,
  userData: IUser,
): Promise<IUser | null> => {
  if (!userData.password) {
    userData.password = config.admin_default_password as string;
  }

  userData.role = 'admin';

  let newUserData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generateAdminId();

    adminData.id = id;
    userData.id = id;

    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin.length) {
      throw new ApiError(400, 'Failed to create admin ');
    }

    userData.admin = newAdmin[0]._id;

    const newUser = await User.create([userData], { session });

    if (!newAdmin.length) {
      throw new ApiError(400, 'Failed to create User ');
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
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserData;
};

export default {
  createStudent,
  createAdmin,
  createFaculty,
};
