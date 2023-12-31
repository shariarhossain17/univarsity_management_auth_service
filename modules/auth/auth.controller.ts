import catchAsync from '../../shared/catchAsync';

import { Request, Response } from 'express';
import sendResponse from '../../shared/sendResponse';

import authServices from './auth.services';

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authServices.loginUser(loginData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user logged in successfully!!',
    result: result,
  });
});

export default {
  LoginUser,
};
