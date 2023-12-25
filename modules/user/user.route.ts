import express from 'express';

import zodValidate from '../../middleware/zodValidate';
import userController from './user.controller';
import createUserZodSchema from './zod.user.schema';

const userRoutes = express.Router();

userRoutes.post(
  '/create-user',
  zodValidate(createUserZodSchema),
  userController.createStudent,
);

export default userRoutes;
