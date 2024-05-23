import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutorDto } from './dto/create-Tutor.dto';
import { PrismaClient } from '@prisma/client';
import { CredentialService } from 'src/credential/credential.service';

@Injectable()
export class TutorService {
    constructor(
        private prisma: PrismaService,
        private readonly credentialService: CredentialService,
    ) { }


    async findByEmail(email: string) {
        return this.prisma.dataTutor.findFirst({
            where: {
                email: { equals: email }
            }
        })
    }

    async findCredential(idDataTutor: number) {
        return this.prisma.dataTutor.findUnique({
            where: { idDataTutor: idDataTutor },
            select: {
                idDataTutor: true,
                email: true,
                credential: true,
            },
        });
    }


    async create(createTutor: CreateTutorDto) {
        try {
            return this.prisma.dataTutor.create({ data: createTutor })
        } catch (error) {
            console.error(error);
            throw new Error('Error creating user');
        }
    }

    // async createCredentialsAndLinkToTutor(
    //     prisma: PrismaClient,
    //     idDataTutor: number
    // ) {

    //     const dataTutor = await this.findCredential(idDataTutor)

    //     if (!dataTutor) {
    //         throw new NotFoundException('Tutor not found');
    //     }

    //     if (dataTutor.credential) {
    //         throw new ConflictException('Tutor already has credentials');
    //     }

    //     const tutorCredential = await this.credentialService.generateCredentialsToTutor(dataTutor.email);

    //     // Vincular credenciales al tutor
    //     await prisma.dataTutor.update({
    //         where: { idDataTutor: dataTutor.idDataTutor },
    //         data: {
    //             credential: {
    //                 connect: tutorCredential,
    //             },
    //         },
    //     });
    // }


}
