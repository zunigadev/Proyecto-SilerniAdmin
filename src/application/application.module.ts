import { Module } from '@nestjs/common';
import { CredentialModule } from 'src/credential/credential.module';
import { IamModule } from 'src/iam/iam.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TutorModule } from 'src/tutor/tutor.module';
import { TutorService } from 'src/tutor/tutor.service';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [PrismaModule, CredentialModule, TutorModule, IamModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, TutorService],
})
export class ApplicationModule { }
