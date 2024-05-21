import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [CaslModule],
  controllers: [TestController]
})
export class TestModule { }
