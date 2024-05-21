import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RolesService]
})
export class RolesModule { }
