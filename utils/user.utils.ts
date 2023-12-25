import { IAcademicSemester } from '../modules/academi_semister/academic.semister.interface';
import { User } from '../modules/user/user.model';

export const findStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
): Promise<string> => {
  const currentId = (await findStudentId()) || (0).toString().padStart(5, '0');

  let newId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  newId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${newId}`;

  return newId;
};

export const findFacultyId = async (): Promise<string | undefined> => {
  const findFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return findFaculty?.id ? findFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId = (await findFacultyId()) || (0).toString().padStart(5, '0');
  let newId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  newId = `F-${newId}`;

  return newId;
};
