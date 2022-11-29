import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { GetUser } from '~src/auth/decorator/user.decorator';
import { TwoFactorAuthGuard } from '~src/auth/guard/2fa-auth.guard';
import { JwtAuthGuard } from '~src/auth/guard/jwt-auth.guard';
import { User } from '~src/user/user.entity';

import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  getHello(@GetUser() user: User) {
    console.log(JSON.stringify(user));
    return this.testService.getHello();
  }

  @Post('/2fa')
  @UseGuards(TwoFactorAuthGuard)
  twoFactorTest(@GetUser() user: User) {
    console.log(JSON.stringify(user));
    return this.testService.getHello();
  }
}
