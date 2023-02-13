import type { Application, Request, Response } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';
import { logger } from './config/logger';
import 'dotenv/config';

const app: Application = express();
const PORT: number = 8001;

app.use(cookieParser());
app.use(cors());
app.use(logger);

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
