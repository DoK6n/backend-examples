import { Router } from 'express';
import { me } from './me.controller';
export const meRouter = Router();

meRouter.get('/', me);
