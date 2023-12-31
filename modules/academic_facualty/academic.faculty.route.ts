import express from 'express';
import zodValidate from '../../middleware/zodValidate';
import facultyController from './academic.faculty.controller';
import zodFacultySchema from './academic.faculty.zod.validation';

const academicFacultyRoute = express.Router();

academicFacultyRoute.post(
  '/create-faculty',
  zodValidate(zodFacultySchema.createFacultySchema),
  facultyController.createFaculty,
);

// get
academicFacultyRoute.get('/all-faculty', facultyController.getAllFaculty);

academicFacultyRoute.get('/:id', facultyController.getSingleFaculty);

academicFacultyRoute.delete('/:id', facultyController.deleteFaculty);

academicFacultyRoute.patch(
  '/:id',
  zodValidate(zodFacultySchema.updateFacultySchema),
  facultyController.updateFaculty,
);

export default academicFacultyRoute;
