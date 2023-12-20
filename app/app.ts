import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../middleware/globalErrorHandler';
import routes from '../route/router';
import { generateFacultyId } from '../utils/user.utils';
const app: Application = express();

app.use(cors());
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

const testId = async () => {
  const result = await generateFacultyId();
  console.log(result);
};

testId();

export default app;
