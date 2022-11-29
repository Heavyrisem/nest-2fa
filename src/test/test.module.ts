import { Module } from '@nestjs/common';

import { AuthModule } from '~src/auth/auth.module';

import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [AuthModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
