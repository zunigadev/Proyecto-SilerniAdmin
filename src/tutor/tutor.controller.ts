import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TutorService } from './tutor.service';

@Controller('tutor')
export class TutorController {
    constructor(private readonly tutorService: TutorService) {}

    @Get(':email')
    async findByEmail(@Param('email') email: string) {
        console.log(email); // Prueba de consola
        return this.tutorService.findByEmail(email); // Corregido: this.applicationService -> this.tutorService
    }
}

