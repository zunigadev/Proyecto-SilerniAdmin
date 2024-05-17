import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SequenceCounterService {
  constructor(private prisma: PrismaService) {}

  async nextVal(sequenceName: string): Promise<number> {
    const counter = await this.prisma.sequenceCounter.findUnique({
      where: { name: sequenceName },
    });

    if (counter) {
      const nextValue = counter.lastUsed + 1;
      await this.prisma.sequenceCounter.update({
        where: { name: sequenceName },
        data: { lastUsed: nextValue },
      });
      return nextValue;
    } else {
      await this.prisma.sequenceCounter.create({
        data: { name: sequenceName, lastUsed: 1 },
      });
      return 1;
    }
  }
}
