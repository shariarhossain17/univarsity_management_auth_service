import express from 'express';

const adminRoute = express.Router();

import zodValidate from '../../middleware/zodValidate';
import adminController from './admin.controller';
import createAdminZodSchema from './admin.validate';

adminRoute.get('/all-admin', adminController.getAllAdmin);
adminRoute.get('/:id', adminController.getSingleAdmin);

adminRoute.patch(
  '/:id',
  zodValidate(createAdminZodSchema),
  adminController.updateAdmin,
);

adminRoute.delete('/:id', adminController.deleteAdmin);
export default adminRoute;
