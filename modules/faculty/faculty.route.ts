import express from 'express';

import zodValidate from '../../middleware/zodValidate';
import facultyController from './faculty.controller';
import createFacultyZodSchema from './faculty.validate';

const facultyRoute = express.Router();

facultyRoute.get('/all-faculty', facultyController.getAllFaculty);
facultyRoute.get('/:id', facultyController.getSingleFaculty);

facultyRoute.patch(
  '/:id',
  zodValidate(createFacultyZodSchema),
  facultyController.updateFaculty,
);

facultyRoute.delete('/:id', facultyController.deleteFaculty);

export default facultyRoute;
