import { Injectable } from '@nestjs/common';
import { User,Credential } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

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


    async findEmail(email: string) {
        // Buscar al usuario por su correo electrónico
        const user = await this.prisma.user.findFirst({
          where: {
            email: email
          }
        });
    
        // Si no se encuentra el usuario, devolver null
        if (!user) {
          return null;
        }
    
        // Obtener la credencial asociada al usuario encontrado
        const credential = await this.prisma.credential.findFirst({
          where: {
            idCredential: user.credentialId
          },
          select: {
            password: true
          }
        });
    
        // Devolver el usuario y la credencial asociada
        return { user, credential };
      }





    
    // //FindByEmail(Auth)
    // async findEmail(email:string): Promise<User|null> {
    //     return await this.prisma.user.findFirst({where: {email}});    
    // }

    // async findCode(password:string): Promise<Credential|null> {
    //     return await this.prisma.credential.findFirst({where: {password}}); 
    // }


    
}
