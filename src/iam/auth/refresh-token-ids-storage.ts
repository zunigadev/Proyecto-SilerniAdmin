import {
    Injectable
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { InvalidateRefreshTokenError } from "./errors/invalidate-refresh-token.error";

@Injectable()
export class RefreshTokenIdsStorage {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async insert(userId: number, tokenId: string): Promise<void> {
        // await this.redisClient.set(this.getKey(userId), tokenId);

        const user = await this.prismaService.user.findUnique({
            where: {
                idUser: userId
            },
            include: {
                credential: true,
            }
        })

        await this.prismaService.credential.update({
            data: {
                tokenId
            },
            where: {
                idCredential: user.credential.idCredential,
            }
        })
    }

    async validate(userId: number, tokenId: string): Promise<boolean> {
        // const storedId = await this.redisClient.get(this.getKey(userId));

        const credential = await this.prismaService.credential.findFirst({
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

    async invalidate(credentialId: number): Promise<void> {
        // await this.redisClient.del(this.getKey(userId));

        await this.prismaService.credential.update({
            data: {
                tokenId: null
            },
            where: {
                idCredential: credentialId,
            }
        })
    }
}
