import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../config';
import ApiError from '../errors/ApiError';
import handleValidationError from '../errors/handleValidationError';

import { ZodError } from 'zod';
import handleCastError from '../errors/handleCastError';
import handleValidationZodError from '../errors/handleValidationZodError';
import { genericError } from '../interface/errorInterFace';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,

  next: NextFunction,
) => {
  // config.env === 'development'
  //   ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
  //   : errorlogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: genericError[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.error;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleValidationZodError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.error;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.error;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  // next();
};
export default globalErrorHandler;
