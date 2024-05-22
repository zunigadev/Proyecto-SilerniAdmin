import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TutorService {
    constructor(
        private prisma: PrismaService,
      ) { }


    async findByEmail(email: string) {
        return this.prisma.credential.findUnique({
            where: {
                email: email,
            }
        })
    }

    async create(mensaje: string) {
        try{
            await console.log(mensaje)
        }catch(error){
            console.error(error);
            throw new Error('Error creating user');
        }
    }
}
