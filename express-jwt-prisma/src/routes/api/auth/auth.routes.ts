import { Router } from 'express';
import authController from './auth.controller';

export const authRouter = Router();

authRouter.post('/', (req, res) => {
  res.send('Auth Router');
});

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/refresh', authController.refresh);
