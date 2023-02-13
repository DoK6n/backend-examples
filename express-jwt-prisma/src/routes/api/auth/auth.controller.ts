import type { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
  // const { email, password } = req.params
  try {
    return res.json({ message: 'Auth login' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    return res.json({ message: 'Auth register' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    return res.json({ message: 'Auth refresh' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default { login, register, refresh };
