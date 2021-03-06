import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes';
import { AppError } from './config/errors/AppError';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use('/public', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'Error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server running');
});
