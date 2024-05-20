import { Module } from '@nestjs/common';
import { HashingModule } from 'src/hashing/hashing.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SequenceCounterModule } from 'src/sequence-counter/sequence-counter.module';
import { CredentialService } from './credential.service';

@Module({
  imports: [PrismaModule, SequenceCounterModule, HashingModule],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule { }
