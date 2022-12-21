import { PickType } from '@nestjs/mapped-types';
import { IsInstance, IsNumber, IsString } from 'class-validator';
import { RoleGroup } from '../entity/role-group.entity';
import { Role } from '../entity/role.entity';

export class SaveRoleGroupDto extends PickType(RoleGroup, ['name', 'description', 'roles']) {}
