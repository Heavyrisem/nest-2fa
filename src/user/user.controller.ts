import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

// import { AuthUser } from '~modules/auth/auth-user.decorator';
// import { AuthGuard } from '~modules/auth/auth.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return { result: await this.userService.createUser(createUserDto) };
  }

  //   @Post('/role/create')
  //   async createRole(@Body() createRoleDto: CreateRoleDto) {
  //     return { result: await this.userService.createRole(createRoleDto) };
  //   }

  //   @UseGuards(AuthGuard)
  //   @Get()
  //   async getCurrentUser(@AuthUser() authUser: User) {
  //     return await this.userService.findById(authUser.id);
  //   }
}
