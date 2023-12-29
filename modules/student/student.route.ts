import express from 'express';
import zodValidate from '../../middleware/zodValidate';

import studentController from './student.controller';
import createStudentZodSchema from './student.validate';

const studentRoute = express.Router();

studentRoute.get('/all-student', studentController.getAllStudent);
studentRoute.get('/:id', studentController.getSingleStudent);

studentRoute.patch(
  '/:id',
  zodValidate(createStudentZodSchema),
  studentController.updateStudent,
);

studentRoute.delete('/:id', studentController.deleteStudent);

export default studentRoute;
