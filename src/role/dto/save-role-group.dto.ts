import { IsInstance, IsNumber, IsString } from 'class-validator';
import { Role } from '../entity/role.entity';

export class SaveRoleGroupDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInstance(Role)
  roles: Role[];
}
