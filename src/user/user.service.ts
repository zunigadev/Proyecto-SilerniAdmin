import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { TransactionContext } from '../common/contexts/transaction.context';
import { CredentialService } from '../credential/credential.service';
import { HashingService } from '../hashing/hashing.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseService } from '../common/services/base.service';

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
      console.log(createUserDto); //Prueba de consola

      if (!credential) {
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

  async changePassword(credentialId: number, newPassword: string, txContext?: TransactionContext) {
    const prisma = this.getPrismaClient(txContext)

    const credential = await prisma.credential.findUnique(
      {where: {idCredential:credentialId}, 
      select: { idCredential:true}
    });

    if(!credential) {
      throw new NotFoundException('User not found')
    }

    const encryptedPassword = await this.hashingService.hash(newPassword)

    await prisma.credential.update({
      data: {
        password: encryptedPassword
      },
      where: {
        idCredential: credentialId
      }
    })
  }

}
