import express from 'express';
import cors from 'cors';
import { router } from './shared/infra/routes';
import { exceptions } from './shared/errors/handle-exceptions';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(exceptions);

export default app;
