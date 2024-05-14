import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findByID(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        idUser: id
      },
      include: {
        credential: true
      }
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) { 
      return null; 
    }

    const credential = await this.prisma.credential.findFirst({
      where: {
        idCredential: user.credentialId
      },
      select: {
        password: true
      }
    });

    return { user, credential };
  }

  // async createUser(createUserDto: CreateUserDto) {
  //   const result = await this.prisma.user.create({
  //     data: createUserDto
  //   });
  //   return result;
  // }

}
