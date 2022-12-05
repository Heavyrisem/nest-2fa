import { Request } from 'express';
import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '~src/user/user.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & { user?: User } = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;

    const { authorization } = request.headers;
    if (authorization) {
      const [_, token] = authorization.split(' ');
      const isValidToken = this.authService.verifyAccessToken(token);
      if (!isValidToken) throw new UnauthorizedException('Token verify failed');
      return user !== undefined;
    }

    return false;
  }
}
