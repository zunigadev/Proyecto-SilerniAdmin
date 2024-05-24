import { Module } from '@nestjs/common';
import { HashingModule } from '../hashing/hashing.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SequenceCounterModule } from '../sequence-counter/sequence-counter.module';
import { CredentialService } from './credential.service';

@Module({
  imports: [PrismaModule, SequenceCounterModule, HashingModule],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule { }
