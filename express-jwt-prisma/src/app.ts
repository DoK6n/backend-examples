import type { Application } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import { logger } from './config/logger';
import 'dotenv/config';
import { bodySender } from './middlewares/bodySender.interceptor';

const app: Application = express();
const PORT: number = 8001;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(logger);
app.use(bodySender);

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
