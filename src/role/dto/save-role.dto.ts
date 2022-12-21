import { PickType } from '@nestjs/mapped-types';
import { Role } from '../entity/role.entity';

export class SaveRoleDto extends PickType(Role, ['name', 'description']) {}
