import { NextFunction, Request, Send } from 'express';

/**
 * Interceptor function used to monkey patch the res.send until it is invoked
 * at which point it intercepts the invokation, executes is logic such as res.contentBody = content
 * then restores the original send function and invokes that to finalize the req/res chain.
 *
 * @param res Original Response Object
 * @param send Original UNMODIFIED res.send function
 * @return A patched res.send which takes the send content, binds it to contentBody on
 * the res and then calls the original res.send after restoring it
 */
const resDotSendInterceptor = (res: any, send: Send) => (content: any) => {
  res.contentBody = content;
  res.send = send;
  res.send(content);
};

/**
 * Router에 요청 오기 전과 응답 후에 작업 할 수 있는 인터셉터 미들웨어
 */
export const loggingInterceptor = (req: Request, res: any, next: NextFunction) => {
  // before request
  res.send = resDotSendInterceptor(res, res.send);
  res.on('finish', () => {
    res;
    console.log('[loggingInterceptor] - ', res.contentBody);
  });
  next();
};
