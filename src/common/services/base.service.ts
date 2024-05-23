import { PrismaClient } from '@prisma/client';
import { TransactionContext } from '../contexts/transaction.context';

export class BaseService {
    constructor(protected readonly prisma: PrismaClient) { }

    protected getPrismaClient(context?: TransactionContext): PrismaClient {
        return context ? context.prisma : this.prisma;
    }
}
