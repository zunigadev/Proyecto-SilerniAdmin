import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateDataTutorDto } from './dto/create-dataTutor.dto';

@Controller('application')
export class ApplicationController {

    constructor(private readonly applicationService: ApplicationService) { }

    @Get(':id')
    getByID(@Param('id', ParseIntPipe) id: number) {
        console.log(id)//Prueba de consola
        return this.applicationService.findByID()
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@Body() data: any, @UploadedFiles() files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded');
        }
        const dataTutor:CreateDataTutorDto = JSON.parse(data.body);
        // Llama al servicio para manejar la subida a terceros
        // await this.uploadService.uploadFiles(files);
        console.log(files)
        console.log("message: 'Files uploaded successfully'")
        return this.applicationService.createApplication(dataTutor);
    }

}
