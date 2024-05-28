import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DeviceService],
  exports: [DeviceService]
})
export class DeviceModule { }
