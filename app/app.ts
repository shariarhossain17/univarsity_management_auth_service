import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../middleware/globalErrorHandler';
import routes from '../route/router';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);
// app.get('/', (_: Request, _: Response, _: NextFunction) => {})

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
