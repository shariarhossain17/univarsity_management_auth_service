import { IAcademicSemester } from '../modules/academi_semister/academic.semister.interface';
import { User } from '../modules/user/user.model';

export const findStudentId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
) => {
  const currentId = (await findStudentId()) || (0).toString().padStart(5, '0');

  let newId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  newId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${newId}`;

  return newId;
};
