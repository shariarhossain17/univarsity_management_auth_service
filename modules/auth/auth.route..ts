import express from 'express';
import { ENUM_USER_ROLE } from '../../enums/user';
import auth from '../../middleware/auth';
import zodValidate from '../../middleware/zodValidate';
import authController from './auth.controller';
import authValidation from './auth.validation';

const authRoute = express.Router();

authRoute.post(
  '/login',
  zodValidate(authValidation.authZodSchema),
  authController.loginUser,
);
authRoute.post(
  '/refresh-token',
  zodValidate(authValidation.refreshZodSchema),
  authController.refreshToken,
);
authRoute.post(
  '/change-password',
  zodValidate(authValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  authController.changePassword,
);

export default authRoute;
