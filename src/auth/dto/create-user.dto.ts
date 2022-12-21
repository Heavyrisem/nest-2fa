import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '~src/user/user.entity';

export class CreateUserDto extends PickType(User, ['email', 'name']) {
  constructor(email: string, name: string, password: string) {
    super();
    this.email = email;
    this.name = name;
    this.password = password;
  }

  @IsString()
  @ApiProperty({ description: '사용자 패스워드' })
  password: string;
}
