import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get('/pools/count', async () => {
    try {
      const count = await prisma.pools.count();
      return { count };
    } catch (error) {
      console.log(error);
      return { count: 0 };
    }
  });

  await fastify.listen({ port: 3333 });
}

bootstrap();
