import pino from 'pino-http';

export const logger = pino({
  level: 'info',
  serializers: {
    req(req) {
      req.body = req.raw.body;
      return req;
    },
    res(res) {
      res.body = JSON.parse(res.raw.resBody);
      return res;
    },
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
