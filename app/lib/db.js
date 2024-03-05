import { PrismaClient } from '@prisma/client';

function prismaClientSingleton() {
  return new PrismaClient();
}

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || prismaClientSingleton();

export const db = prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}