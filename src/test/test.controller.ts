import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetUser } from '~src/auth/decorator/user.decorator';
import { JwtAuthGuard } from '~src/auth/guard/jwt-auth.guard';
import { User } from '~src/user/user.entity';

import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getHello(@GetUser() user: User) {
    console.log(JSON.stringify(user));
    return this.testService.getHello();
  }
}
