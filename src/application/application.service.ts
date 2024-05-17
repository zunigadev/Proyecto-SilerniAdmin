import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDataTutorDto } from './dto/create-dataTutor.dto';
import { UpdateStatusChildDto } from './dto/update-status.dto';

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

    async changeStatusApplication(id: number,statusApplication: UpdateStatusChildDto){

        const postulationChild = await this.prisma.postulationChild.update({
            where: {idPostulationChild: id},
            data: {status: statusApplication.status}
        })

        return postulationChild
    }


}
