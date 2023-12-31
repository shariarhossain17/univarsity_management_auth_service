import express from 'express';

import zodValidate from '../../middleware/zodValidate';
import userController from './user.controller';
import createUserZodSchema from './zod.user.schema';

const userRoutes = express.Router();

userRoutes.post(
  '/create-student',
  zodValidate(createUserZodSchema),
  userController.createStudent,
);
userRoutes.post(
  '/create-faculty',
  zodValidate(createUserZodSchema),
  userController.createFaculty,
);
userRoutes.post(
  '/create-admin',
  zodValidate(createUserZodSchema),
  userController.createAdmin,
);

export default userRoutes;
