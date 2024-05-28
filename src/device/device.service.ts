import { Injectable } from '@nestjs/common';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { BaseService } from 'src/common/services/base.service';
import { getInfoOfUserAgent } from 'src/common/utils/log-in-attempt-utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDeviceLogin } from './dto/register-device-log-in.dto';

@Injectable()
export class DeviceService extends BaseService {

    constructor(
        protected readonly prismaService: PrismaService,
    ) {
        super(prismaService)
    }

    async registerDevice(
        registerDeviceLogin: RegisterDeviceLogin,
        txContext?: TransactionContext,
    ) {

        const prisma = this.getPrismaClient(txContext)

        const userAgentInfo = getInfoOfUserAgent(registerDeviceLogin.userAgent)

        const uniqueDeviceId = `${registerDeviceLogin.userId}-${userAgentInfo.deviceType}-${userAgentInfo.operatingSystem}-${userAgentInfo.browser}`;

        // check if device is already register by user
        const deviceRegistered = await prisma.device.findUnique({
            where: {
                userId: registerDeviceLogin.userId,
                uniqueDeviceId: uniqueDeviceId,
            }
        })

        if (deviceRegistered) {
            return;
        }

        await prisma.device.create({
            data: {
                deviceType: userAgentInfo.deviceType,
                operatingSystem: userAgentInfo.operatingSystem,
                browser: userAgentInfo.browser,
                userId: registerDeviceLogin.userId,
                uniqueDeviceId,
            },
        });

    }

}
