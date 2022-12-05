import { SetMetadata } from '@nestjs/common';
import { Roles } from '~src/role/entity/role.entity';

export const ROLE_KEY = 'roles';
export const Role = (...roles: Roles[]) => SetMetadata(ROLE_KEY, roles);
