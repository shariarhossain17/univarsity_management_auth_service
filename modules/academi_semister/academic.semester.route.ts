import express from 'express';
import zodValidate from '../../middleware/zodValidate';
import academicSemesterController from './academic.semister.controller';
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './zod.academicsemester.schema';

const semesterRoute = express.Router();

semesterRoute.post(
  '/create-semester',
  zodValidate(createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
);

// update semester

semesterRoute.patch(
  '/:id',
  zodValidate(updateAcademicSemesterZodSchema),
  academicSemesterController.updateSemesterById,
);

// get semester
semesterRoute.get(
  '/all-semester',
  academicSemesterController.getAllAcademicSemester,
);

semesterRoute.get('/:id', academicSemesterController.getSingleSemesterById);

export default semesterRoute;
