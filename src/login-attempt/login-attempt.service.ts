import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { LogLoginAttemptDto } from './dto/log-login-attempt.dto';
import { getInfoOfUserAgent, getLocationByIp } from 'src/common/utils/log-in-attempt-utils';

@Injectable()
export class LoginAttemptService extends BaseService {
    constructor(
        protected readonly prismaService: PrismaService,
    ) {
        super(prismaService)
    }

    async logLoginAttempt(
        logLoginAttemptDto: LogLoginAttemptDto,
        txContext?: TransactionContext
    ) {
        const prisma = this.getPrismaClient(txContext)

        const userAgentInfo = getInfoOfUserAgent(logLoginAttemptDto.userAgent)
        const location = getLocationByIp(logLoginAttemptDto.ip)


        return prisma.loginAttempt.create({
            data: {
                browser: userAgentInfo.browser,
                deviceType: userAgentInfo.deviceType,
                operatingSystem: userAgentInfo.operatingSystem,
                location,
                success: logLoginAttemptDto.success,
                ipAddress: logLoginAttemptDto.ip,
                userAgent: logLoginAttemptDto.userAgent,
                userId: logLoginAttemptDto.userId,
            },
        });
    }

}
