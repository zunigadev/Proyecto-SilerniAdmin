import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TutorService],
  exports: [TutorService]
})
export class TutorModule {}
