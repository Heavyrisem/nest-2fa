import { IsEnum, IsString } from 'class-validator';
import { Roles } from '../entity/role.entity';

export class SaveRoleDto {
  @IsEnum(Roles)
  name: Roles;

  @IsString()
  description: string;
}
