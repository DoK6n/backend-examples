import { PrismaClient } from '@prisma/client';
import prismaClient from '~/config/database/prismaClient';

export default abstract class BaseRepository {
  prisma: PrismaClient = prismaClient;

  disconnect() {
    this.prisma.$disconnect();
  }
}
