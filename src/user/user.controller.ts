import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthPayload } from '~src/auth/auth.interface';
import { JwtPayload } from '~src/auth/decorator/jwt.decorator';
import { GetUser } from '~src/auth/decorator/user.decorator';
import { JwtAuthGuard } from '~src/auth/guard/jwt-auth.guard';

// import { AuthUser } from '~modules/auth/auth-user.decorator';
// import { AuthGuard } from '~modules/auth/auth.guard';

import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@GetUser() user: User, @JwtPayload() payload: JwtAuthPayload) {
    const result: User & { twoFactorAuthenticated?: boolean } = user;
    result.twoFactorAuthenticated = payload.twoFactorAuthenticated;

    return { result };
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
