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

departMentRoute.get(
  '/all-department',
  academicDepartmentController.getAllAcademicDepartment,
);

export default departMentRoute;
