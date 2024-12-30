import {
  Month,
  semesterCode,
  semesterTitle,
} from './academic.semister.interface';

export const academicSemesterMonth: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitle: semesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: semesterCode[] = ['01', '02', '03'];

export const validSemesterCode: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const searchParamsFields = ['title', 'code', 'year'];

export const filterKeys = ['searchParams', 'year', 'code', 'title', 'syncId'];

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academicSemester.created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academicSemester.updated';
