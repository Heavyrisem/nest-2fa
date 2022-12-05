import { FindOneOptions, Repository } from 'typeorm';

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async createUser({ email, password, name }: CreateUserDto): Promise<boolean> {
    const exists = await this.userRepository.findOne({ where: { email } });
    if (exists) throw new ConflictException('Account Already Exists');

    // const role = await this.userRoleRepository.find({
    //   where: roles.map((roleName) => ({ name: roleName })),
    // });

    // const twoFactorKey = this.totpService.generateSecret();
    // const twoFactorUrl = this.totpService.getURL(twoFactorKey);

    const user = this.userRepository.create({ email, password, name });
    return Boolean(await this.userRepository.save(user));
    // return { twoFactorKey, twoFactorUrl };
  }

  async findById(userId: number, options?: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      ...options,
    });
    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }
}
