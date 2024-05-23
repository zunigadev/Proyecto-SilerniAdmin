import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TutorController } from './tutor.controller';
import { CredentialModule } from 'src/credential/credential.module';

@Module({
  imports: [PrismaModule, CredentialModule],
  providers: [TutorService],
  exports: [TutorService],
  controllers: [TutorController]
})
export class TutorModule {}
