import express from 'express';
import manageDepartmentController from './manage.department.controller';

const mangeDepartmentRoute = express.Router();

mangeDepartmentRoute.post(
  '/create-managedepartment',
  manageDepartmentController.createManagementDepartment,
);

export default mangeDepartmentRoute;
