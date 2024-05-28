import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TutorService } from './tutor.service';

@Controller('tutor')
export class TutorController {
    constructor(private readonly tutorService: TutorService) { }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string) {
        return this.tutorService.findByEmail(email);
    }

    @Get('id/:id')
    async getTutorById(@Param('id', ParseIntPipe) idDataTutor: number) {
        return this.tutorService.findCredential(idDataTutor);
    }

}

