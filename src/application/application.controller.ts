import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateDataTutorDto } from './dto/create-dataTutor.dto';
import { UpdateStatusChildDto } from './dto/update-status.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) { }

  @Get(':id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    console.log(id); //Prueba de consola
    return this.applicationService.findByID();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @Body() data: any,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    //Verificar tipo de dato any
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    const dataTutor: CreateDataTutorDto = JSON.parse(data.body);

    return this.applicationService.createApplication(dataTutor);
  }

  @Patch(':id')
  async changeStatus(
    @Param('id') id: number,
    @Body() changeStatus: UpdateStatusChildDto
  ) {
    return this.applicationService.changeStatusApplication(
      Number(id),
      changeStatus
    );
  }
}
