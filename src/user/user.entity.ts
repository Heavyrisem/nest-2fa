import { ApiProperty } from '@nestjs/swagger';
import { hash, compare } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsInstance, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';
import { RoleGroup } from '~src/role/entity/role-group.entity';

@Entity()
export class User extends CoreEntity {
  @IsString()
  @Column()
  @ApiProperty({ description: '사용자 이메일' })
  email: string;

  @IsString()
  @Column()
  @ApiProperty({ description: '사용자 이름' })
  name: string;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @Column()
  password: string;

  @Exclude()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Column({ nullable: true })
  twoFactorSecret?: string;

  @Exclude()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Column({ nullable: true })
  refreshToken?: string;

  @IsOptional()
  @IsInstance(RoleGroup)
  @OneToOne(() => RoleGroup, (roleGroup) => roleGroup.id)
  @JoinColumn()
  @ApiProperty({ description: '권한 그룹' })
  roleGroup?: RoleGroup;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    return await compare(inputPassword, this.password);
  }
}
