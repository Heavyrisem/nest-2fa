import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Role } from '~src/auth/decorator/role.decorator';

import { GetUser } from '~src/auth/decorator/user.decorator';
import { TwoFactorAuthGuard } from '~src/auth/guard/2fa-auth.guard';
import { JwtAuthGuard } from '~src/auth/guard/jwt-auth.guard';
import { RoleGuard } from '~src/auth/guard/role.guard';
import { Roles } from '~src/role/entity/role.entity';
import { User } from '~src/user/user.entity';

import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('/')
  @Role(Roles.TEST_ROLE, Roles.TEST_ROLE, Roles.TEST_ROLE, Roles.TEST_ROLE)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  postHello(@GetUser() user: User) {
    // console.log(user);
    return this.testService.getHello();
  }

  @Post('/2fa')
  @UseGuards(TwoFactorAuthGuard)
  twoFactorTest(@GetUser() user: User) {
    console.log(user);
    return this.testService.getHello();
  }

  @Get('/')
  getHello() {
    return this.testService.getHello();
  }
}
