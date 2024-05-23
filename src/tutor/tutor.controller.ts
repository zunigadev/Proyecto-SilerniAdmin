import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TutorService } from './tutor.service';

@Controller('tutor')
export class TutorController {
    constructor(private readonly tutorService: TutorService) {}

    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        console.log(email); // Prueba de consola
        return this.tutorService.findByEmail(email); // Corregido: this.applicationService -> this.tutorService
    }

    @Get('id/:id')
    async getTutorById(@Param('id', ParseIntPipe) idDataTutor: number) {
        return this.tutorService.findCredential(idDataTutor);
    }

}

