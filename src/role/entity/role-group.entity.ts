import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CoreEntity } from '~modules/database/core.entity';
import { Role } from './role.entity';

@Entity()
export class RoleGroup extends CoreEntity {
  @IsString()
  @Column({ unique: true })
  @ApiProperty({ description: '권한 그룹 이름' })
  name: string;

  @IsString()
  @Column()
  @ApiProperty({ description: '권한 그룹 설명' })
  description: string;

  @IsInstance(Role)
  @ManyToMany(() => Role, (role) => role.id, { eager: true })
  @JoinTable({ name: 'role_group_join' })
  @ApiProperty({ description: '권한 목록' })
  roles: Role[];
}
