import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CaslModule } from 'src/casl/casl.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [CaslModule, MailerModule,],
  controllers: [TestController]
})
export class TestModule { }
