import type { Application, Request, Response } from 'express';
import express from 'express';
import routes from './routes';
import { logger } from './config/logger';
import 'dotenv/config';

const app: Application = express();
const PORT: number = 8001;

app.use(logger);

app.use('/api/v1/', routes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
