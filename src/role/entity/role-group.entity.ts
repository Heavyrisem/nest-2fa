import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CoreEntity } from '~modules/database/core.entity';
import { Role } from './role.entity';

@Entity()
export class RoleGroup extends CoreEntity {
  @IsString()
  @Column({ unique: true })
  name: string;

  @IsString()
  @Column()
  description: string;

  @ManyToMany(() => Role, (role) => role.id)
  @JoinTable({ name: 'role_group_join' })
  roles: Role[];
}
