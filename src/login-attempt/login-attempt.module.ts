import { Module } from '@nestjs/common';
import { LoginAttemptService } from './login-attempt.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LoginAttemptService],
  exports: [LoginAttemptService],
})
export class LoginAttemptModule { }
