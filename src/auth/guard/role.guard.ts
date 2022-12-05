import { Request } from 'express';
import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { User } from '~src/user/user.entity';

import { Roles } from '~src/role/entity/role.entity';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorator/role.decorator';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & { user?: User } = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;
    if (!user) return false;

    const roles = this.reflector.get<Roles[]>(ROLE_KEY, context.getHandler());
    const { roleGroup } = user;
    if (roles === undefined) return true;
    if (roleGroup === undefined || roles === undefined) return false;

    const filteredRoles = roleGroup.roles.filter((role) => roles.includes(role.name));
    if (filteredRoles.length !== roles.length) return false;
    return true;
  }
}
