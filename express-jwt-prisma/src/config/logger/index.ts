import pino from 'pino-http';

export const logger = pino({
  level: 'info',
  serializers: {
    req(req) {
      req.body = req.raw.body;
      return req;
    },
  },
});
