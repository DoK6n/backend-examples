import type { Application, Request, Response } from 'express';
import express from 'express';

const app: Application = express();
const PORT: number = 8001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
