import {
    BadRequestException,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { TransactionContext } from "src/common/contexts/transaction.context";
import { BaseService } from "src/common/services/base.service";
import { PrismaService } from "src/prisma/prisma.service";
import { TokenType } from "./enum/token-type.enum";
import { InvalidateRefreshTokenError } from "./errors/invalidate-refresh-token.error";

@Injectable()
export class TokenIdsStorage extends BaseService {

    constructor(
        protected readonly prismaService: PrismaService,
    ) {
        super(prismaService)
    }

    async insert(userId: number, tokenId: string, tokenType: TokenType, txContext?: TransactionContext): Promise<void> {

        const prisma = this.getPrismaClient(txContext)
        // await this.redisClient.set(this.getKey(userId), tokenId);

        const user = await prisma.user.findUnique({
            where: {
                idUser: userId
            },
            include: {
                credential: true,
            }
        })

        let updateData: any = {};
        if (tokenType === TokenType.REFRESH_TOKEN) {
            updateData = { refreshTokenId: tokenId };
        } else if (tokenType === TokenType.VERIFY_EMAIL) {
            updateData = { emailTokenId: tokenId };
        } else if (tokenType === TokenType.RESET_PASSWORD) {
            updateData = { resetPassTokenId: tokenId };
        } else {
            throw new BadRequestException('Token Type not valid');
        }

        await prisma.credential.update({
            data: updateData,
            where: {
                idCredential: user.credential.idCredential,
            }
        })
    }

    async validate(userId: number, tokenId: string, tokenType: TokenType, txContext?: TransactionContext): Promise<boolean> {
        const prisma = this.getPrismaClient(txContext)
        // const storedId = await this.redisClient.get(this.getKey(userId));

        const credential = await prisma.credential.findFirst({
            where: {
                user: {
                    idUser: userId,
                }
            }
        })

        if (!credential) {
            throw new NotFoundException('Credential not found')
        }

        let storedTokenId: string | undefined;
        if (tokenType === TokenType.REFRESH_TOKEN) {
            storedTokenId = credential.refreshTokenId;
        } else if (tokenType === TokenType.VERIFY_EMAIL) {
            storedTokenId = credential.emailTokenId;
        } else if (tokenType === TokenType.RESET_PASSWORD) {
            storedTokenId = credential.resetPassTokenId;
        } else {
            throw new Error('Tipo de token no válido');
        }

        if (storedTokenId !== tokenId) {
            throw new InvalidateRefreshTokenError();
        }
        return storedTokenId === tokenId;
    }

    async invalidate(credentialId: number, tokenType: TokenType, txContext?: TransactionContext): Promise<void> {
        const prisma = this.getPrismaClient(txContext)
        // await this.redisClient.del(this.getKey(userId));

        let updateData: any = {};
        if (tokenType === TokenType.REFRESH_TOKEN) {
            updateData = { refreshTokenId: null };
        } else if (tokenType === TokenType.VERIFY_EMAIL) {
            updateData = { emailTokenId: null };
        } else if (tokenType === TokenType.RESET_PASSWORD) {
            updateData = { resetPassTokenId: null };
        } else {
            throw new BadRequestException('Token Type not valid');
        }

        await prisma.credential.update({
            data: updateData,
            where: {
                idCredential: credentialId,
            }
        })
    }
}
