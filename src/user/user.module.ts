import { Module } from '@nestjs/common';
import { CredentialModule } from '../credential/credential.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashingModule } from '../hashing/hashing.module';

@Module({
  imports: [PrismaModule, CredentialModule, HashingModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
