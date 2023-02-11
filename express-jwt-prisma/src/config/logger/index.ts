import expressPino from 'express-pino-logger';

export const logger = expressPino({
  level: 'info',
});
