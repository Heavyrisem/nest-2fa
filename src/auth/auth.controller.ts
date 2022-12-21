import { Request, Response } from 'express';

import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { TotpService } from '~modules/totp/totp.service';
import { LoginDto } from '~src/auth/dto/login.dto';
import { User } from '~src/user/user.entity';

import { AuthService } from './auth.service';
import { GetUser } from './decorator/user.decorator';
import { TwoFactorLoginDto } from './dto/2fa-login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './auth.interface';
import { LoggerService } from '~modules/logging/logger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly totpService: TotpService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get('/2fa')
  @ApiOperation({
    summary: '2FA QR Image',
    description: '2FA 인증기 등록을 위한 QR 이미지를 가져옵니다. (회원가입 이후 최초 1회만 가능)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'image/png')
  async generateTwoFactorCode(@Res() res: Response, @GetUser() user: User) {
    const twoFactorSecret = await this.authService.generateTwoFactorSecretForUser(user.id);
    const otpURL = this.totpService.getURL(twoFactorSecret);
    return this.totpService.generateQrCode(res, otpURL);
  }

  @Post('/register')
  @ApiOperation({ summary: '회원가입' })
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const { accessToken, refreshToken } = await this.authService.register(createUserDto);

    this.authService.setRefreshCookie(res, refreshToken);
    res.send({ accessToken });
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인', description: '이메일, 패스워드 기반 로그인' })
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const { accessToken, refreshToken } = await this.authService.login(loginDto);
    this.authService.setRefreshCookie(res, refreshToken);

    res.send({ accessToken }); // TODO: API 응답 형식 통일
  }

  @Post('/login/2fa')
  @ApiOperation({ summary: '2FA 로그인', description: '2FA 코드로 로그인을 진행합니다.' })
  @ApiBearerAuth()
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

    this.authService.setRefreshCookie(res, refreshToken);
    res.send({ accessToken }); // TODO: API 응답 형식 통일
  }

  @Post('/re-issue')
  @ApiOperation({
    summary: '토큰 재발급',
    description: '만료된 AccessToken을 RefreshToken으로 새로 발급합니다.',
  })
  @ApiBearerAuth()
  async reIssueToken(@Req() req: Request, @Res() res: Response, @GetUser() user: User) {
    const accessToken = req.headers.authorization?.replace('Bearer ', '') || null;
    const refreshToken = req.cookies['refreshToken']?.replace('Bearer ', '') || null;
    if (!accessToken || !refreshToken) throw new UnauthorizedException('No Param');

    const isAccessValid = this.authService.verifyAccessToken(accessToken);
    const isRefreshValid = await this.authService.verifyRefreshToken(user.id, refreshToken);
    if (!isAccessValid && !isRefreshValid) throw new UnauthorizedException('TokenExpired');

    const accessPayload = this.jwtService.decode(refreshToken) as JwtAuthPayload;
    const newAccessToken = this.authService.generateAccessToken(accessPayload);

    if (isAccessValid && !isRefreshValid && refreshToken === user?.refreshToken) {
      this.loggerService.debug('Re-Create refreshToken');
      const refreshPayload = this.jwtService.decode(accessToken) as JwtAuthPayload;
      const newRefreshToken = await this.authService.generateRefreshToken(refreshPayload);

      this.authService.setRefreshCookie(res, newRefreshToken);
      res.send({ accessToken });
      return;
    }

    res.send({ accessToken: newAccessToken });
  }
}
