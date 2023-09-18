import { Response } from 'express';

type IApiresponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  result?: T;
};
const sendResponse = <T>(res: Response, data: IApiresponse<T>): void => {
  const responseData: IApiresponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    result: data.result,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
