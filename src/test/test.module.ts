import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthModule } from '~src/auth/auth.module';

import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [AuthModule, JwtModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
