import { Module } from '@nestjs/common';
import { PermissionModule } from 'src/permission/permission.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [PrismaModule, PermissionModule],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule { }
