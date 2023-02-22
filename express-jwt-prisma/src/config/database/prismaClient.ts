import { PrismaClient } from '@prisma/client';
import { createPrismaQueryEventHandler } from 'prisma-query-log';

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
    { emit: 'stdout', level: 'error' },
  ],
  errorFormat: 'minimal',
});

const log = createPrismaQueryEventHandler({
  queryDuration: true,
  format: false,
  colorQuery: '\u001B[96m',
  colorParameter: '\u001B[90m',
});

prisma.$on('query', log);

export default prisma;
