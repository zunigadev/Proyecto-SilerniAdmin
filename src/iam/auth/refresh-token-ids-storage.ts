import {
    Injectable
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { InvalidateRefreshTokenError } from "./errors/invalidate-refresh-token.error";
import { BaseService } from "src/common/services/base.service";
import { TransactionContext } from "src/common/contexts/transaction.context";

@Injectable()
export class RefreshTokenIdsStorage extends BaseService {

    constructor(
        protected readonly prismaService: PrismaService,
    ) {
        super(prismaService)
    }

    async insert(userId: number, tokenId: string, txContext?: TransactionContext): Promise<void> {

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

        await prisma.credential.update({
            data: {
                tokenId
            },
            where: {
                idCredential: user.credential.idCredential,
            }
        })
    }

    async validate(userId: number, tokenId: string, txContext?: TransactionContext): Promise<boolean> {
        const prisma = this.getPrismaClient(txContext)
        // const storedId = await this.redisClient.get(this.getKey(userId));

        const credential = await prisma.credential.findFirst({
            where: {
                user: {
                    idUser: userId,
                }
            }
        })

        if (credential.tokenId !== tokenId) {
            throw new InvalidateRefreshTokenError();
        }
        return credential.tokenId === tokenId;
    }

    async invalidate(credentialId: number, txContext?: TransactionContext): Promise<void> {
        const prisma = this.getPrismaClient(txContext)
        // await this.redisClient.del(this.getKey(userId));

        await prisma.credential.update({
            data: {
                tokenId: null
            },
            where: {
                idCredential: credentialId,
            }
        })
    }
}
