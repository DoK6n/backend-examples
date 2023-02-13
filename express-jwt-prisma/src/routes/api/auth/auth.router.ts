import type { Response } from 'express';
import { Router } from 'express';
import authController from './auth.controller';

export const authRouter = Router();

authRouter.get('/', (req, res) => {
  res.send('Auth Router');
});

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.refresh);
authRouter.post('/refresh', authController.register);

/** 쿠키에 토큰 저장 */
function setTokenCookie(res: Response, tokens: { accessToken: string; refreshToken: string }) {
  res.cookie('access_token', tokens.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    path: '/',
  });
  res.cookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    path: '/',
  });
}
