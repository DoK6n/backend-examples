// import type { Request, Response } from 'express';
import express from 'express';

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Root path');
});

// define the about route
routes.get('/about', (req, res) => {
  res.send('About path');
});

export default routes;
