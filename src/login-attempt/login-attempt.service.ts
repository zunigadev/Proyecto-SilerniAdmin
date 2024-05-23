import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoginAttemptDto } from './dto/create-loginAttempt.dto';
import { BaseService } from 'src/common/services/base.service';
import { TransactionContext } from 'src/common/contexts/transaction.context';

@Injectable()
export class LoginAttemptService extends BaseService {
    constructor(
        protected readonly prismaService: PrismaService,
    ) {
        super(prismaService)
    }

    async logLoginAttempt(
        userId: number,
        createLoginAttemptDto: CreateLoginAttemptDto,
        txContext?: TransactionContext
    ) {

        const prisma = this.getPrismaClient(txContext)
        return prisma.loginAttempt.create({
            data: {
                username: createLoginAttemptDto.username,
                success: createLoginAttemptDto.success,
                ipAddress: createLoginAttemptDto.ipAddress,
                userAgent: createLoginAttemptDto.userAgent,
                userId: userId,
            },
        });
    }

}
