import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SequenceCounterService {
  constructor(private prisma: PrismaService) {}

  async nextVal(prisma: PrismaClient, sequenceName: string): Promise<number> {
    const counter = await prisma.sequenceCounter.findUnique({
      where: { name: sequenceName },
    });

    if (counter) {
      const nextValue = counter.lastUsed + 1;
      await prisma.sequenceCounter.update({
        where: { name: sequenceName },
        data: { lastUsed: nextValue },
      });
      return nextValue;
    } else {
      await prisma.sequenceCounter.create({
        data: { name: sequenceName, lastUsed: 1 },
      });
      return 1;
    }
  }
}
