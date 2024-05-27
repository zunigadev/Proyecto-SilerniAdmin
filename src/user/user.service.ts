import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { CredentialService } from 'src/credential/credential.service';
import { HashingService } from 'src/hashing/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    protected prisma: PrismaService,
    private readonly credentialService: CredentialService,
    private readonly hashingService: HashingService,
  ) {
    super(prisma)
  }

  async findAll(txContext?: TransactionContext): Promise<User[]> {
    const prisma = this.getPrismaClient(txContext)

    return await prisma.user.findMany();
  }

  async findByID(id: number, txContext?: TransactionContext): Promise<User | null> {

    const prisma = this.getPrismaClient(txContext)

    return await prisma.user.findUnique({
      where: {
        idUser: id,
      },
      include: {
        credential: true,
      },
    });
  }

  async findByCode(code: string, txContext?: TransactionContext) {
    const prisma = this.getPrismaClient(txContext)

    const user = await prisma.user.findFirst({
      where: {
        credential: {
          code
        },
      },
      include: {
        credential: true
      }
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string, txContext?: TransactionContext) {
    const prisma = this.getPrismaClient(txContext)

    const user = await prisma.user.findFirst({
      where: {
        credential: {
          email
        },
      },
      include: {
        credential: true
      }
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: number, txContext?: TransactionContext) {
    const prisma = this.getPrismaClient(txContext)

    const user = await prisma.user.findUnique({
      where: {
        idUser: id,
      },
      include: {
        credential: true,
      }
    });

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto, txContext?: TransactionContext) {
    try {
      const prisma = this.getPrismaClient(txContext)
      const { name, p_surname, m_surname, status, credential } = createUserDto;
      console.log(createUserDto);

      if (!credential.password) {
        const temporaryPassword =
          await this.credentialService.generateTemporaryPassword(8);
        credential.password = temporaryPassword;
        credential.repPassword = temporaryPassword;
      } else {
        credential.password = await this.hashingService.hash(credential.password)
        credential.repPassword = credential.password
      }

      return prisma.user.create({
        data: {
          name,
          p_surname,
          m_surname,
          status,
          credential: {
            create: {
              code: credential.code,
              email: credential.email,
              password: credential.password,
              repPassword: credential.repPassword,
            },
          },
        },
        include: {
          credential: true
        }
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  }

  async verifyEmail(credentialId: number, txContext?: TransactionContext): Promise<any> {

    const prisma = this.getPrismaClient(txContext)

    await prisma.credential.update({
      data: {
        emailVerified: true
      },
      where: {
        idCredential: credentialId,
      }
    })
  }
}
