import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from '~modules/database/core.entity';

export enum Roles {
  TEST_ROLE = 'TestRole',
  MANAGE_USER = 'ManageUser',
}

@Entity()
export class Role extends CoreEntity {
  @IsEnum(Roles)
  @Column({ unique: true })
  @ApiProperty({ description: '권한 이름' })
  name: Roles;

  @IsString()
  @Column()
  @ApiProperty({ description: '권한 설명' })
  description: string;
}
