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

mangeDepartmentRoute.get(
  '/all-managementDepartment',
  manageDepartmentController.getAllManagementDepartment,
);
mangeDepartmentRoute.get(
  '/:id',
  manageDepartmentController.getSingleManagementDepartment,
);
mangeDepartmentRoute.patch(
  '/:id',
  zodValidate(manageDepartmentValidate.updateManagementDepartmentSchema),
  manageDepartmentController.updateManagementDepartment,
);
mangeDepartmentRoute.delete(
  '/:id',
  manageDepartmentController.deleteManagementDepartment,
);

export default mangeDepartmentRoute;
