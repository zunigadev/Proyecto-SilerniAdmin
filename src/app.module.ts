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
import { IamModule } from './iam/iam.module';
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permission/permission.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    PrismaModule,
    IamModule,
    UserModule,
    ApplicationModule,
    CredentialModule,
    SequenceCounterModule,
    RolesModule,
    PermissionModule,
    MenuModule,
  ],
  controllers: [AppController, ApplicationController],
  providers: [AppService, ApplicationService],
})
export class AppModule { }
