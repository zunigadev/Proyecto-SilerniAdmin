import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SequenceCounterModule } from 'src/sequence-counter/sequence-counter.module';

@Module({
  imports: [PrismaModule, SequenceCounterModule],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule {}
