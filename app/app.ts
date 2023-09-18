import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from '../middleware/globalErrorHandler';
import routes from '../route/router';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// app.get('/', (_: Request, _: Response, _: NextFunction) => {})

app.use(globalErrorHandler);
export default app;
