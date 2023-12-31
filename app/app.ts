import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../middleware/globalErrorHandler';
import routes from '../route/router';
const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: 'false',
    message: 'not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'path not found',
      },
    ],
  });
  next();
});

export default app;
