import express from 'express';

import zodValidate from '../../middleware/zodValidate';
import userController from './user.controller';
import createUserZodSchema from './zod.user.schema';

const router = express.Router();

router.post(
  '/create-user',
  zodValidate(createUserZodSchema),
  userController.createUser,
);

export default router;
