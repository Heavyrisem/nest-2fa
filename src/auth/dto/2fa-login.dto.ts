import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class TwoFactorLoginDto {
  constructor(twoFactorCode: string) {
    this.twoFactorCode = twoFactorCode;
  }

  @IsNumberString()
  @Length(6, 6)
  @ApiProperty({ description: '2FA 인증 코드', minLength: 6, maxLength: 6 })
  twoFactorCode: string;
}
