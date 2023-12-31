import catchAsync from '../../shared/catchAsync';

import { Request, Response } from 'express';
import sendResponse from '../../shared/sendResponse';

import config from '../../config';
import authServices from './auth.services';

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authServices.loginUser(loginData);

  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env == 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user logged in successfully!!',
    result: others,
  });
});

export default {
  LoginUser,
};
