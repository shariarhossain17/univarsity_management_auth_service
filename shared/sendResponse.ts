import { Response } from 'express';

type IApiresponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    count: number;
  };
  result?: T | null;
};
const sendResponse = <T>(res: Response, data: IApiresponse<T>): void => {
  const responseData: IApiresponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    result: data.result || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
