import { ZodError, ZodIssue } from 'zod';
import { genericError } from '../interface/errorInterFace';
import IerrorResponse from '../interface/errorResponse';
const handleValidationZodError = (error: ZodError): IerrorResponse => {
  const errors: genericError[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    status: 400,
    message: 'validation error',
    error: errors,
  };
};

export default handleValidationZodError;
