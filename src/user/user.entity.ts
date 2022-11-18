import { hash, compare } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';

@Entity()
export class User extends CoreEntity {
  @IsString()
  @Column()
  email: string;

  @IsString()
  @Column()
  name: string;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @Column()
  password: string;

  @Column()
  @IsString()
  two_factor: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    return await compare(inputPassword, this.password);
  }
}
