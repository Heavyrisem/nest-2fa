import { IsNumberString, Length } from 'class-validator';

export class TwoFactorLoginDto {
  constructor(twoFactorCode: string) {
    this.twoFactorCode = twoFactorCode;
  }

  @IsNumberString()
  @Length(6, 6)
  twoFactorCode: string;
}
