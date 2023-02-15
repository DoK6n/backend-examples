import { NextFunction, Request, Response } from 'express';

export const bodySender = (req: Request, res: any, next: NextFunction) => {
  // call before router

  let send = res.send;
  // pino에서 response data를 받아서 로깅하기 위한 작업
  res.send = resBody => {
    res.resBody = resBody;
    res.send = send;
    return res.send(resBody);
  };

  res.on('finish', () => {
    // call after router
  });
  next();
};
