import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtService } from '~modules/jwt/jwt.service';
import { TotpService } from '~modules/totp/totp.service';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly totpService: TotpService,
  ) {}

  async createUser({
    email,
    password,
    name,
  }: CreateUserDto): Promise<{ twoFactorKey: string; twoFactorUrl: string }> {
    const exists = await this.userRepository.findOne({ where: { email } });
    if (exists) throw new ConflictException('Account Already Exists');

    // const role = await this.userRoleRepository.find({
    //   where: roles.map((roleName) => ({ name: roleName })),
    // });

    const twoFactorKey = this.totpService.generateSecret();
    const twoFactorUrl = this.totpService.getURL(twoFactorKey);

    const user = this.userRepository.create({ email, password, name, two_factor: twoFactorKey });
    await this.userRepository.save(user);
    return { twoFactorKey, twoFactorUrl };
  }

  async login({ email, password, twoFactorCode: user2faCode }: LoginUserDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User Not Found');
    if (!(await user.checkPassword(password))) throw new UnauthorizedException('Password is Wrong');

    const server2faCode = this.totpService.getCode(user.two_factor);
    console.log(`Trying to log in with 2faCode: ${user2faCode}, ${server2faCode}`);
    if (String(server2faCode) !== String(user2faCode))
      throw new UnauthorizedException('2FA authentication failed');

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      //   role: user.role.map((r) => ({ name: r.name, description: r.description })),
    });
    return token;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }
}
