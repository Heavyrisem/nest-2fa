import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumberString, IsString, Length } from 'class-validator';
import { User } from '~src/user/user.entity';

export class LoginDto extends PickType(User, ['email']) {
  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  @IsString()
  @ApiProperty({ description: '사용자 패스워드' })
  password: string;
}
