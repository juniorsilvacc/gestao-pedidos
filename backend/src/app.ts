import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { router } from './shared/infra/routes';
import { exceptions } from './shared/errors/handle-exceptions';
import { errors } from 'celebrate';
import rateLimiter from './shared/infra/middlewares/rate-limiter';
import uploadConfig from './config/upload';
import './shared/container';

const app = express();

app.use(rateLimiter);

app.use(express.json());
app.use(cors());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(router);

app.use(errors());

app.use(exceptions);

export default app;
