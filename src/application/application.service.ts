import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StatusApplication } from 'src/common/enums/status-application.enum';
import { CredentialService } from 'src/credential/credential.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDataTutorDto } from './dto/create-dataTutor.dto';
import { UpdateStatusChildDto } from './dto/update-status.dto';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly credentialService: CredentialService
  ) {}

  async findByID() {
    return await this.prisma.user.findMany();
  }

  async createApplication(dataTutor: CreateDataTutorDto) {
    try {
      await this.prisma.$transaction(async (tx: PrismaClient) => {
        const { postulationChildren, ...dataTutorToSave } = dataTutor;

        // check if exists credential with email datatutor.
        const tutorCredential = await tx.credential.findUnique({
          where: {
            email: dataTutorToSave.email,
          },
        });

        if (tutorCredential) {
          throw new ConflictException('Email already registered');
        }

        const postulationsToSave = postulationChildren.map(
          (currrentPostulation) => {
            const { filesPostulations, ...dataPostulationToSave } =
              currrentPostulation;

            const filesToSave = {
              create: filesPostulations,
            };

            return {
              ...dataPostulationToSave,
              filesPostulations: filesToSave,
            };
          }
        );

        const savedDataTutor = await tx.dataTutor.create({
          data: {
            ...dataTutorToSave,
            postulationChild: { create: postulationsToSave },
          },
        });

        // Crear credenciales para tutor
        await this.createCredentialsAndLinkToTutor(
          tx,
          savedDataTutor.idDataTutor
        );
      });
    } catch (error) {
      throw error;
    }
  }

  async changeStatusApplication(
    id: number,
    statusApplication: UpdateStatusChildDto
  ) {
    try {
      await this.prisma.$transaction(async (prisma: PrismaClient) => {
        const postulationChild = await prisma.postulationChild.findUnique({
          where: { idPostulationChild: id },
          select: {
            status: true,
            dataTutor: true,
          },
        });

        if (!postulationChild) {
          throw new NotFoundException('Application not found');
        }

        if (postulationChild.status !== StatusApplication.PENDING) {
          throw new ConflictException('Application is not pending');
        }

        // Crear credenciales para estudiante y tutor (si es necesario)
        if (statusApplication.status === StatusApplication.ACCEPTED) {
          const postulationChildCredential =
            await this.credentialService.generateCredentialsToStudent();

          // Vincular credenciales al estudiante y guardar nuevo estado.
          await prisma.postulationChild.update({
            where: { idPostulationChild: id },
            data: {
              status: statusApplication.status,
              credential: {
                connect: postulationChildCredential,
              },
            },
          });
        } else {
          // Solo actualizar el estado si no es aceptado
          await prisma.postulationChild.update({
            where: { idPostulationChild: id },
            data: {
              status: statusApplication.status,
            },
          });
        }

        return postulationChild;
      });
    } catch (error) {
      throw error;
    }
  }

  private async createCredentialsAndLinkToTutor(
    prisma: PrismaClient,
    idDataTutor: number
  ) {
    const dataTutor = await prisma.dataTutor.findUnique({
      where: { idDataTutor: idDataTutor },
      select: {
        idDataTutor: true,
        email: true,
        credential: true,
      },
    });

    if (!dataTutor) {
      throw new NotFoundException('Tutor not found');
    }

    if (dataTutor.credential) {
      throw new ConflictException('Tutor already has credentials');
    }

    const tutorCredential =
      await this.credentialService.generateCredentialsToTutor(dataTutor.email);

    // Vincular credenciales al tutor
    await prisma.dataTutor.update({
      where: { idDataTutor: dataTutor.idDataTutor },
      data: {
        credential: {
          connect: tutorCredential,
        },
      },
    });
  }
}
