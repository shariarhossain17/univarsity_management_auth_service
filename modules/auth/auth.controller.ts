import catchAsync from '../../shared/catchAsync';

import { Request, Response } from 'express';
import sendResponse from '../../shared/sendResponse';

import config from '../../config';
import { IRefreshToken } from './auth.interface';
import authServices from './auth.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authServices.loginUser(loginData);

  const { refreshToken } = result;

  const cookieOptions = {
    secure: config.env == 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user logged in successfully!!',
    result: result,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env == 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshToken>(res, {
    statusCode: 200,
    success: true,
    message: 'user logged in successfully!!',
    result: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...loginData } = req.body;

  await authServices.changePassword(user, loginData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'password changed successfully!!',
  });
});

export default {
  loginUser,
  refreshToken,
  changePassword,
};
