import { ConflictException, Injectable } from '@nestjs/common';
import { HashingService } from 'src/hashing/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SequenceCounterService } from 'src/sequence-counter/sequence-counter.service';
import { CreateCredentialDto } from './dto/create-credential.dto';

@Injectable()
export class CredentialService {
  private readonly sequenceName = 'student_code_sequence';

  constructor(
    private readonly prismaService: PrismaService,
    private readonly sequenceCounterService: SequenceCounterService,
    private readonly hashingService: HashingService,
  ) { }

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

  async generateStudentCode(): Promise<string> {
    const nextCode = await this.sequenceCounterService.nextVal(
      this.sequenceName
    );
    return `ALU${nextCode.toString().padStart(6, '0')}`;
  }

  async generateCredentialsToStudent() {
    const temporaryPassword = await this.generateTemporaryPassword(8);
    const studentCode = await this.generateStudentCode();
    return this.saveCredentials({
      code: studentCode,
      password: temporaryPassword,
      repPassword: temporaryPassword,
    });
  }

  async generateCredentialsToTutor(email: string) {
    const credentials = await this.prismaService.credential.findUnique({
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
    });
  }

  // Función para guardar credenciales
  async saveCredentials(createCredentialDto: CreateCredentialDto) {
    return await this.prismaService.credential.create({
      data: createCredentialDto,
    });
  }
}
