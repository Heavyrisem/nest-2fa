import { Repository } from 'typeorm';

import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { TotpService } from '~modules/totp/totp.service';
import { JwtAuthPayload } from '~src/auth/auth.interface';
import { LoginDto } from '~src/auth/dto/login.dto';
import { User } from '~src/user/user.entity';

import { TwoFactorLoginDto } from './dto/2fa-login.dto';
import { LoggerService } from '~modules/logging/logger.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly totpService: TotpService,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {}

  async login({
    email,
    password,
  }: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User Not Found');
    if (!(await user.checkPassword(password))) throw new UnauthorizedException('Password is Wrong');

    const payload: JwtAuthPayload = {
      id: user.id,
      twoFactorAuthenticated: false,
      //   email: user.email,
      //   name: user.name,
      //   role: user.role.map((r) => ({ name: r.name, description: r.description })),
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    await this.userRepository.update({ id: user.id }, { refreshToken });

    return { accessToken, refreshToken };
  }

  async generateTwoFactorSecretForUser(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User Not Found');

    if (user.twoFactorSecret) throw new HttpException('Resource Locked', 423);

    const twoFactorSecret = this.totpService.generateSecret();
    await this.userRepository.update({ id: user.id }, { twoFactorSecret });

    return twoFactorSecret;
  }

  async verifyTwoFactorCode(
    userId: number,
    { twoFactorCode: userTwoFactorCode }: TwoFactorLoginDto,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User Not Found');
    if (!user.twoFactorSecret) throw new NotFoundException('OTP is not registered');

    const serverTwoFactorCode = this.totpService.getCode(user.twoFactorSecret);
    this.loggerService.debug(`GeneratedCode ${serverTwoFactorCode}`);
    if (serverTwoFactorCode !== userTwoFactorCode)
      throw new UnauthorizedException('2FA authentication failed');

    const payload: JwtAuthPayload = { id: user.id, twoFactorAuthenticated: true };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    await this.userRepository.update({ id: user.id }, { refreshToken });

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string) {
    try {
      this.jwtService.verify(token, { secret: this.configService.get('JWT_ACCESS_SECRET') });
      return true;
    } catch (err) {
      return false;
    }
  }

  generateAccessToken(payload: JwtAuthPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES'),
    });
  }
  generateRefreshToken(payload: JwtAuthPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
    });
  }
}
