// import type { Request, Response } from 'express';
import { Router } from 'express';
import { authRouter, meRouter } from './api';

const router = Router();

router.get('/', (req, res) => {
  res.send('Root path');
});

router.use('/auth', authRouter);
router.use('/me', meRouter);

export default router;
