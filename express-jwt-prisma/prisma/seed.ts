import prisma from '../src/config/database/prismaClient';
import bcrypt from 'bcrypt';

async function main() {
  console.log(`[seed] - Start seeding ...`);
  const SALT_ROUNDS = 10;
  const seedPasswordHash = await bcrypt.hash('00000000', SALT_ROUNDS);
  // seed data

  const seedUser = await prisma.user.upsert({
    where: { email: 'node@email.com' },
    update: {},
    create: {
      email: 'node@email.com',
      username: 'tester',
      passwordHash: seedPasswordHash,
      createdAt: new Date(),
      Token: {
        create: [
          {
            rotationCounter: 1,
            blocked: false,
          },
        ],
      },
    },
  });

  console.log('[seed data]', seedUser);
  console.log(`[seed] Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
