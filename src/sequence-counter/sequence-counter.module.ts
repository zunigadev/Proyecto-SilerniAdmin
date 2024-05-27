import { Module } from '@nestjs/common';
import { SequenceCounterService } from './sequence-counter.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SequenceCounterService],
  exports: [SequenceCounterService],
})
export class SequenceCounterModule {}
