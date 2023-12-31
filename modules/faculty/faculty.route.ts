import express from 'express';

import facultyController from './faculty.controller';

const facultyRoute = express.Router();

facultyRoute.get('/all-student', facultyController.getAllFaculty);
facultyRoute.get('/:id', facultyController.getSingleFaculty);

facultyRoute.patch(
  '/:id',
  //   zodValidate(createStudentZodSchema),
  facultyController.updateFaculty,
);

facultyRoute.delete('/:id', facultyController.deleteFaculty);

export default facultyRoute;
