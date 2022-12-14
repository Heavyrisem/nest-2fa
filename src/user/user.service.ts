import { FindOneOptions, Repository } from 'typeorm';

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findById(userId: number, options?: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      ...options,
    });
    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }
}
