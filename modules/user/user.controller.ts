import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { createUserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await createUserService(userData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user data crate successfully!!',
    result: user,
  });
});

export default {
  createUser,
};
