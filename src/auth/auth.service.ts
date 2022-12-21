import { Repository } from 'typeorm';

import {
  ConflictException,
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
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly totpService: TotpService,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {}

  async register({
    email,
    password,
    name,
  }: CreateUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    const exists = await this.findUser({ email });
    if (exists) throw new ConflictException('Account Already Exists');

    // const role = await this.userRoleRepository.find({
    //   where: roles.map((roleName) => ({ name: roleName })),
    // });
    // TODO: transaction 추가
    const user = this.userRepository.create({ email, password, name });
    await this.userRepository.save(user);

    const payload = this.generatePayload(user);

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async login({
    email,
    password,
  }: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.findUser({ email });
    if (!user) throw new NotFoundException('User Not Found');
    if (!(await user.checkPassword(password))) throw new UnauthorizedException('Password is Wrong');

    const payload = this.generatePayload(user);

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  async generateTwoFactorSecretForUser(userId: number) {
    const user = await this.findUser({ id: userId });
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
    const user = await this.findUser({ id: userId });
    if (!user) throw new NotFoundException('User Not Found');
    if (!user.twoFactorSecret) throw new NotFoundException('OTP is not registered');

    const serverTwoFactorCode = this.totpService.getCode(user.twoFactorSecret);
    this.loggerService.log(`GeneratedCode ${serverTwoFactorCode}`);
    if (serverTwoFactorCode !== userTwoFactorCode)
      throw new UnauthorizedException('2FA authentication failed');

    const payload = this.generatePayload(user, { twoFactorAuthenticated: true });

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

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
  async verifyRefreshToken(userId: number, token: string) {
    try {
      this.jwtService.verify(token, { secret: this.configService.get('JWT_REFRESH_SECRET') });
      const user = await this.findUser({ id: userId });
      return user?.refreshToken === token;
    } catch (err) {
      return false;
    }
  }

  generateAccessToken(payload: JwtAuthPayload) {
    delete payload.exp;
    delete payload.iat;

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES') / 1000,
    });
  }

  async generateRefreshToken(payload: JwtAuthPayload) {
    delete payload.exp;
    delete payload.iat;

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES') / 1000,
    });
    await this.userRepository.update({ id: payload.id }, { refreshToken });
    return refreshToken;
  }

  setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', `Bearer ${refreshToken}`, {
      httpOnly: true,
    });
  }

  generatePayload(user: User, override?: Partial<JwtAuthPayload>): JwtAuthPayload {
    return {
      id: user.id,
      twoFactorAuthenticated: false,
      roles: user.roleGroup?.roles.map((role) => role.name) || null,
      ...override,
    };
  }

  private async findUser(filter: Partial<Pick<User, 'id' | 'email' | 'name'>>) {
    return this.userRepository.findOne({ where: { ...filter }, relations: ['roleGroup'] });
  }
}
