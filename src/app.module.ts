import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { ApplicationService } from './application/application.service';
import { ApplicationController } from './application/application.controller';
import { PrismaModule } from './prisma/prisma.module';
import { CredentialModule } from './credential/credential.module';
import { SequenceCounterModule } from './sequence-counter/sequence-counter.module';
import { RoleModule } from './role/role.module';
import { IamModule } from './iam/iam.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    PrismaModule,
    IamModule,
    UserModule,
    ApplicationModule,
   
   
    CredentialModule,
   
   
    SequenceCounterModule,
    RoleModule,
    RoleModule,
  ],
  controllers: [AppController, ApplicationController],
  providers: [AppService, ApplicationService],
})
export class AppModule { }
