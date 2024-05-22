import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { CredentialService } from 'src/credential/credential.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly credentialService: CredentialService,
    private readonly hashingService: HashingService,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findByID(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        idUser: id,
      },
      include: {
        credential: true,
      },
    });
  }

  async findByCode(code: string) {
    const user = await this.prisma.user.findFirst({
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

  async findById(id: number) {

    const user = await this.prisma.user.findUnique({
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

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { name, p_surname, m_surname, status, credential } = createUserDto;

      if (credential.password === null) {
        const temporaryPassword =
          await this.credentialService.generateTemporaryPassword(8);
        credential.password = temporaryPassword;
        credential.repPassword = temporaryPassword;
      } else {
        credential.password = await this.hashingService.hash(credential.password)
        credential.repPassword = credential.password
      }

      return this.prisma.user.create({
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
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  }
}
