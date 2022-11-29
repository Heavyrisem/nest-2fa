import { Response } from 'express';

import { Body, Controller, Get, Header, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TotpService } from '~modules/totp/totp.service';
import { LoginDto } from '~src/auth/dto/login.dto';
import { User } from '~src/user/user.entity';

import { AuthService } from './auth.service';
import { GetUser } from './decorator/user.decorator';
import { TwoFactorLoginDto } from './dto/2fa-login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly totpService: TotpService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/2fa')
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'image/png')
  async generateTwoFactorCode(@Res() res: Response, @GetUser() user: User) {
    const twoFactorSecret = await this.authService.generateTwoFactorSecretForUser(user.id);
    const otpURL = this.totpService.getURL(twoFactorSecret);
    return this.totpService.generateQrCode(res, otpURL);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const { accessToken, refreshToken } = await this.authService.login(loginDto);

    res.cookie('refreshToken', `Bearer ${refreshToken}`, {
      httpOnly: true,
      maxAge: this.configService.get('REFRESH_AGE'),
    });

    res.send({ accessToken }); // TODO: API 응답 형식 통일
  }

  @Post('/login/2fa')
  @UseGuards(JwtAuthGuard)
  async verifyTwoFactor(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() twoFactorLoginDto: TwoFactorLoginDto,
  ) {
    const { accessToken, refreshToken } = await this.authService.verifyTwoFactorCode(
      user.id,
      twoFactorLoginDto,
    );

    res.cookie('refreshToken', `Bearer ${refreshToken}`, {
      httpOnly: true,
      maxAge: this.configService.get('REFRESH_AGE'),
    });

    res.send({ accessToken }); // TODO: API 응답 형식 통일
  }
}
