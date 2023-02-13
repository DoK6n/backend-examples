import type { Application } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import { logger } from './config/logger';
import 'dotenv/config';
import { loggingInterceptor } from './config/interceptors/loggingInterceptor';

const app: Application = express();
const PORT: number = 8001;

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(logger);
app.use(loggingInterceptor);

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
