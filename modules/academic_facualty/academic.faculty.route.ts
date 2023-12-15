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

// get
facultyRouter.get('/all-faculty', facultyController.getAllFaculty);

facultyRouter.get('/:id', facultyController.getSingleFaculty);

facultyRouter.delete('/:id', facultyController.deleteFaculty);

facultyRouter.patch(
  '/:id',
  zodValidate(zodFacultySchema.updateFacultySchema),
  facultyController.updateFaculty,
);

export default facultyRouter;
