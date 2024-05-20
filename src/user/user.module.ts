import { Module } from '@nestjs/common';
import { CredentialModule } from 'src/credential/credential.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  imports: [PrismaModule, CredentialModule, HashingModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
