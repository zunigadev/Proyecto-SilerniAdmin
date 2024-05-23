import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MetadataScanner, ModulesContainer, Reflector } from '@nestjs/core';

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [
    PermissionService,
    Reflector,
    MetadataScanner,
    ModulesContainer,
  ],
  exports: [PermissionService]
})
export class PermissionModule { }
