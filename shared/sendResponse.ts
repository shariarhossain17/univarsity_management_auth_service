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
  result?: T;
};
const sendResponse = <T>(res: Response, data: IApiresponse<T>): void => {
  const responseData: IApiresponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta,
    result: data.result,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
