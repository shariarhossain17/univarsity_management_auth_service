import express from 'express';
import zodValidate from '../../middleware/zodValidate';
import manageDepartmentController from './manage.department.controller';
import manageDepartmentValidate from './manage.department.validate';

const mangeDepartmentRoute = express.Router();

mangeDepartmentRoute.post(
  '/create-managedepartment',
  zodValidate(manageDepartmentValidate.managementDepartmentSchema),
  manageDepartmentController.createManagementDepartment,
);

export default mangeDepartmentRoute;