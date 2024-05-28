import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req
} from '@nestjs/common';
import { AuthType } from 'src/common/enums/auth-type.enum';
import { Auth } from 'src/iam/auth/decorators/auth.decorator';
import { ApplicationService } from './application.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateStatusChildDto } from './dto/update-status.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) { }

  @Get(':id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.findByID(id);
  }

  /*   @Post()
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
    } */

  @Post('tutor')
  @Auth(AuthType.None)
  async createTutor(@Req() req: Request, @Body() createTutorDto: CreateTutorDto) {
    createTutorDto.userAgent = req.headers['user-agent'];
    return await this.applicationService.txCreateTutor(createTutorDto);

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





