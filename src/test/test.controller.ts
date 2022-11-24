import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '~modules/auth/auth.guard';

import { TestService } from './test.service';

@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getHello() {
    return this.testService.getHello();
  }
}
