import { ConflictException, Injectable } from '@nestjs/common';
import { HashingService } from 'src/hashing/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SequenceCounterService } from 'src/sequence-counter/sequence-counter.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class CredentialService extends BaseService {
  private readonly sequenceName = 'student_code_sequence';

  constructor(
    protected readonly prismaService: PrismaService,
    private readonly sequenceCounterService: SequenceCounterService,
    private readonly hashingService: HashingService,
  ) {
    super(prismaService)
  }

  async findByEmail(email: string, txContext?: TransactionContext) {
    const prisma = this.getPrismaClient(txContext)

    return await prisma.credential.findUnique({
      where: {
        email: email,
      },
    });
  }

  async generateTemporaryPassword(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let temporaryPassword = '';
    for (let i = 0; i < length; i++) {
      temporaryPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    const passwordHash = await this.hashingService.hash(temporaryPassword);
    return passwordHash;
  }

  async generateStudentCode(txContext?: TransactionContext) {

    const nextCode = await this.sequenceCounterService.nextVal(
      this.sequenceName,
      txContext,
    );
    return `ALU${nextCode.toString().padStart(6, '0')}`;
  }

  async generateCredentialsToStudent(txContext?: TransactionContext) {

    const temporaryPassword = await this.generateTemporaryPassword(8);
    const studentCode = await this.generateStudentCode(txContext);
    return this.saveCredentials({
      code: studentCode,
      password: temporaryPassword,
      repPassword: temporaryPassword,
    }, txContext);
  }

  async generateCredentialsToTutor(email: string, txContext: TransactionContext) {
    const prisma = this.getPrismaClient(txContext)

    const credentials = await prisma.credential.findUnique({
      where: {
        email: email,
      },
    });

    if (credentials) {
      throw new ConflictException('Email is already in use');
    }

    const temporaryPassword = await this.generateTemporaryPassword(8);

    return this.saveCredentials({
      email: email,
      password: temporaryPassword,
      repPassword: temporaryPassword,
    },
      txContext);
  }

  // Función para guardar credenciales
  async saveCredentials(createCredentialDto: CreateCredentialDto, txContext: TransactionContext) {
    const prisma = this.getPrismaClient(txContext)

    return await prisma.credential.create({
      data: createCredentialDto,
    });
  }
}
