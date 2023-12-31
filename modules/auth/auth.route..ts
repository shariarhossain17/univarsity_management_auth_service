import express from 'express';
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

export default authRoute;
