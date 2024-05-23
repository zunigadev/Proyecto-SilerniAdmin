import { PrismaClient } from "@prisma/client";

export class TransactionContext {
    constructor(public readonly prisma: PrismaClient) { }
}
