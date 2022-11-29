import { IsNumberString, IsString, Length } from 'class-validator';

export class LoginDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @IsString()
  email: string;

  @IsString()
  password: string;
}
