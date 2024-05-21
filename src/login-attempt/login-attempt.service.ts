import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoginAttemptDto } from './dto/create-loginAttempt.dto';

@Injectable()
export class LoginAttemptService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async logLoginAttempt(userId: number, createLoginAttemptDto: CreateLoginAttemptDto) {
        return this.prismaService.loginAttempt.create({
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
