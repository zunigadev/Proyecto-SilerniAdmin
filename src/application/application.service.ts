import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDataTutorDto } from './dto/create-dataTutor.dto';

@Injectable()
export class ApplicationService {
    constructor(private prisma: PrismaService) { }

    async findByID(){
        return await this.prisma.user.findMany();
    }

    async createApplication(dataTutor: CreateDataTutorDto){
        const {postulationChildren, ...dataTutorToSave} = dataTutor

        const postulationsToSave = postulationChildren.map((currrentPostulation) => {
            const {filesPostulations, ...dataPostulationToSave} = currrentPostulation

            const filesToSave = {
                create: filesPostulations
            }

            return {
                ...dataPostulationToSave,
                filesPostulations: filesToSave,
            }
        })

        return await this.prisma.dataTutor.create({data: {...dataTutorToSave, postulationChild: {create:postulationsToSave}}})
    }


}
