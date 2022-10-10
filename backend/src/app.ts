import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { exceptions } from './shared/errors/handle-exceptions';
import { errors } from 'celebrate';
import { router } from './shared/infra/routes';
import rateLimiter from './shared/infra/middlewares/rate-limiter';
import uploadConfig from './config/upload';
import './shared/container';

import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(rateLimiter);

app.use(router);

app.use(errors());

app.use(exceptions);

export default app;
