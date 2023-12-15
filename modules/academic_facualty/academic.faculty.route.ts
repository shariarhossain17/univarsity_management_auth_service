import express from 'express';
import zodValidate from '../../middleware/zodValidate';
import facultyController from './academic.faculty.controller';
import zodFacultySchema from './academic.faculty.zod.validation';

const facultyRouter = express.Router();

facultyRouter.post(
  '/create-faculty',
  zodValidate(zodFacultySchema.createFacultySchema),
  facultyController.createFaculty,
);

facultyRouter.get('/all-faculty', facultyController.getAllFaculty);

export default facultyRouter;
