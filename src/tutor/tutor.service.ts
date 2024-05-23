import { ConflictException, Injectable } from '@nestjs/common';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { BaseService } from 'src/common/services/base.service';
import { CredentialService } from 'src/credential/credential.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutorDto } from './dto/create-Tutor.dto';

@Injectable()
export class TutorService extends BaseService {
    constructor(
        protected prisma: PrismaService,
        private readonly credentialService: CredentialService,
    ) {
        super(prisma)
    }


    async findByEmail(email: string, context?: TransactionContext) {
        const prisma = this.getPrismaClient(context)
        return prisma.dataTutor.findFirst({
            where: {
                email: { equals: email }
            }
        })
    }

    async findCredential(idDataTutor: number, context?: TransactionContext) {
        const prisma = this.getPrismaClient(context)
        return prisma.dataTutor.findUnique({
            where: { idDataTutor: idDataTutor },
            select: {
                idDataTutor: true,
                email: true,
                credential: true,
            },
        });
    }


    async create(createTutor: CreateTutorDto, context?: TransactionContext) {
        const prisma = this.getPrismaClient(context)
        try {

            return prisma.dataTutor.create({ data: createTutor })
        } catch (error) {
            console.error(error);
            throw new ConflictException('Error creating user');
        }
    }


}
