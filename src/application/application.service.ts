import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { StatusApplication } from 'src/common/enums/status-application.enum';
import { BaseService } from 'src/common/services/base.service';
import { CredentialService } from 'src/credential/credential.service';
import { AuthService } from 'src/iam/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TutorService } from 'src/tutor/tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateStatusChildDto } from './dto/update-status.dto';

@Injectable()
export class ApplicationService extends BaseService {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly credentialService: CredentialService,
    private readonly tutorService: TutorService,
    private readonly authService: AuthService,
  ) {
    super(prisma)
  }

  async findByID(id: number, context?: TransactionContext) {
    const prisma = this.getPrismaClient(context)

    return await prisma.postulationChild.findUnique({
      where: {
        idPostulationChild: id,
      },
    });
  }

  async txCreateTutor(createTutor: CreateTutorDto) {
    const prisma = this.getPrismaClient()
    try {

      return await prisma.$transaction(async (tx: PrismaClient) => {
        const txContext = new TransactionContext(tx);

        // verify if exists credential with email sent
        const credential = await this.credentialService.findByEmail(createTutor.email, txContext)

        if (credential) {
          throw new ConflictException('Email already registered');
        }
        //

        const { password, ...tutorToSave } = createTutor

        // create tutor on db
        await this.tutorService.create(tutorToSave, txContext)
        //

        // register user

        return await this.authService.register({
          name: createTutor.name,
          m_surname: createTutor.lastName,
          p_surname: createTutor.lastName,
          status: 'normal',
          credential: {
            email: createTutor.email,
            password: password,
          },
          userAgent: '',
        },
          txContext)
        //

      });

    } catch (error) {
      throw error;
    }
  }


  /* async createApplication(dataTutor: CreateDataTutorDto, context?: TransactionContext) {
    const prisma = this.getPrismaClient(context)
    try {
      await prisma.$transaction(async (tx: PrismaClient) => {

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

      });
    } catch (error) {
      throw error;
    }
  } */

  async changeStatusApplication(
    id: number,
    statusApplication: UpdateStatusChildDto, context?: TransactionContext
  ) {
    const prisma = this.getPrismaClient(context)

    try {
      await prisma.$transaction(async (tx: PrismaClient) => {

        const txContext = new TransactionContext(tx)

        const postulationChild = await txContext.prisma.postulationChild.findUnique({
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
          throw new ConflictException('Application in pending');
        }

        // Crear credenciales para estudiante y tutor (si es necesario)
        if (statusApplication.status === StatusApplication.ACCEPTED) {
          const postulationChildCredential =
            await this.credentialService.generateCredentialsToStudent(txContext);

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
              reasons: {
                create: statusApplication.argument ? {
                  argument: statusApplication.argument,
                } : undefined,
              }
            },
          });
        }

        return postulationChild;
      });
    } catch (error) {
      throw error;
    }
  }
}
