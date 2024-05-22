import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTutorDto } from './dto/create-Tutor.dto';

@Injectable()
export class TutorService {
    constructor(
        private prisma: PrismaService
      ) { }


    async findByEmail(email: string) {
        return this.prisma.dataTutor.findFirst({
            where: {
                email: {equals: email}
            }
        })
    }

    async create(createTutor: CreateTutorDto) {
        try{
            return this.prisma.dataTutor.create({data:createTutor})
        }catch(error){
            console.error(error);
            throw new Error('Error creating user');
        }
    }
}
