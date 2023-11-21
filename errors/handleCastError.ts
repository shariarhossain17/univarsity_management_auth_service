import mongoose from 'mongoose';
import { genericError } from '../interface/errorInterFace';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: genericError[] = [
    {
      path: error.path,
      message: 'invalid Id',
    },
  ];
  return {
    status: 400,
    message: 'validation error',
    error: errors,
  };
};

export default handleCastError;
