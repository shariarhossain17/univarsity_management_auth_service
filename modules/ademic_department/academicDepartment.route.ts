import express from 'express';
import zodValidate from '../../middleware/zodValidate';
import academicDepartmentController from './academicDepartment.controller';
import academicDepartmentValidate from './academicDepartment.validate';

const departMentRoute = express.Router();

departMentRoute.post(
  '/create-department',
  zodValidate(academicDepartmentValidate.departmentValidate),
  academicDepartmentController.createAcademicDepartment,
);

departMentRoute.get('/', academicDepartmentController.getAllAcademicDepartment);
departMentRoute.get('/:id', academicDepartmentController.getSingleDepartment);
departMentRoute.delete(
  '/:id',
  academicDepartmentController.deleteDepartmentById,
);
departMentRoute.patch(
  '/:id',
  zodValidate(academicDepartmentValidate.departmentUpdateValidate),
  academicDepartmentController.updateDepartmentById,
);

export default departMentRoute;
