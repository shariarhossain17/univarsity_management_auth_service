import express from 'express';
import zodValidate from '../../middleware/zodValidate';
import academicSemesterController from './academic.semister.controller';
import createAcademicSemesterZodSchema from './zod.academicsemester.schema';

const semesterRoute = express.Router();

semesterRoute.post(
  '/create-semester',
  zodValidate(createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
);

export default semesterRoute;
