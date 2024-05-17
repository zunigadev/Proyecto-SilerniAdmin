import { Module } from '@nestjs/common';
import { SequenceCounterService } from './sequence-counter.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SequenceCounterService]
})
export class SequenceCounterModule {}
