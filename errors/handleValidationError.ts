import mongoose from 'mongoose';
import { genericError } from '../interface/errorInterFace';
import IerrorResponse from '../interface/errorResponse';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IerrorResponse => {
  const errors: genericError[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );

  return {
    status: 400,
    message: 'validation error',
    error: errors,
  };
};

export default handleValidationError;
