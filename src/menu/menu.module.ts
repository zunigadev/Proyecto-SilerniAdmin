import { Module } from '@nestjs/common';
import { PermissionModule } from 'src/permission/permission.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MenuService } from './menu.service';

@Module({
  imports: [PrismaModule, PermissionModule],
  providers: [MenuService]
})
export class MenuModule { }
