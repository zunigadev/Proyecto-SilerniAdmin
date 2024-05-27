import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationController } from './application/application.controller';
import { ApplicationModule } from './application/application.module';
import { ApplicationService } from './application/application.service';
import { CaslModule } from './casl/casl.module';
import { CredentialModule } from './credential/credential.module';
import { IamModule } from './iam/iam.module';
import { LoginAttemptModule } from './login-attempt/login-attempt.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { SequenceCounterModule } from './sequence-counter/sequence-counter.module';
import { TestModule } from './test/test.module';
import { TutorModule } from './tutor/tutor.module';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './device/device.module';
import config from './config/configuration'
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    PrismaModule,
    PermissionModule,
    CaslModule,
    UserModule,
    ApplicationModule,
    CredentialModule,
    SequenceCounterModule,
    RolesModule,
    MenuModule,
    IamModule,
    TestModule,
    LoginAttemptModule,
    TutorModule,
    MailerModule,
    DeviceModule,
  ],
  controllers: [AppController, ApplicationController],
  providers: [AppService, ApplicationService],
})
export class AppModule { }
