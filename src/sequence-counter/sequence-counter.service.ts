import { Injectable } from '@nestjs/common';
import { TransactionContext } from '../common/contexts/transaction.context';
import { BaseService } from '../common/services/base.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SequenceCounterService extends BaseService {
  constructor(
    protected readonly prisma: PrismaService
  ) {
    super(prisma)
  }

  async nextVal(sequenceName: string, txContext: TransactionContext): Promise<number> {
    const prisma = this.getPrismaClient(txContext)

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
