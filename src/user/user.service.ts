import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';


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

  async findByCode(code: string) {
    const credential = await this.prisma.credential.findFirst({
      where: {
        code: code
      }
    });

    if (!credential) { 
      return null; 
    }

    return { credential };
  }

  createUser(createUserDto: CreateUserDto) {

    // const { email, name, p_surname, m_surname, status, credential } = createUserDto;
    // return await this.prisma.dataTutor.create({data: {...dataTutorToSave, postulationChild: {create:postulationsToSave}}})

    try {

      const { name, p_surname, m_surname, status, credential } = createUserDto;
      console.log(createUserDto) //Prueba de consola
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
                    repPassword: credential.repPassword
                  }
              }
          }
      }); 
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  }

  

}
