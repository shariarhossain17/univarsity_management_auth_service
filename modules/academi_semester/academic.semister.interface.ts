import { Model } from 'mongoose';
export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type semesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type semesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: semesterTitle;
  year: Number;
  code: semesterCode;
  startMonth: Month;
  endMonth: Month;
  syncId: string;
};

export type IAcademicSemesterEvent = {
  id: string;
  title: string;
  year: Number;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type AcademicSemester = Model<IAcademicSemester>;

export type ISearchparams = {
  searchParams?: string;
};
