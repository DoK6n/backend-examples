import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { setTokenCookie, generateToken } from '~/utils/token';
import UserService from '~/services/user.service';
import { LoginRequestDto, RegisterRequestDto } from '~/interfaces/user.interface.dto';
import AppError from '~/utils/error/appError';

const userService = UserService.getInstance();

interface Request<T = {}> extends ExpressRequest {
  body: T;
}

interface Response extends ExpressResponse {}

const login = async (req: Request<LoginRequestDto>, res: Response) => {
  try {
    const { email, password } = req.body;

    const authResult = await userService.login({ email, password });
    setTokenCookie(res, authResult.tokens);
    return res.json(authResult);
  } catch (e) {
    return res.status(e.statusCode).json(e);
  }
};

const register = async (req: Request<RegisterRequestDto>, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const result = await userService.register({ email, username, password });

    return res.json(result);
  } catch (e) {
    return res.status(e.statusCode).json(e);
  }
};

const refresh = async (req: Request<{ refreshToken: string }>, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken ?? req.cookies.refresh_token ?? '';

    // const refreshToken = req.cookies.refresh_token ?? '';

    const tokens = await userService.refreshToken(refreshToken);

    return res.json(tokens);
  } catch (e) {
    return res.status(e.statusCode).json(e);
  }
};

export default { login, register, refresh };
