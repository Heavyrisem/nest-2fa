import { Request } from 'express';
import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '~src/user/user.entity';

import { JwtAuthPayload } from '../auth.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class TwoFactorAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & { user?: User } = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;

    const { authorization } = request.headers;
    if (authorization) {
      const [_, token] = authorization.split(' ');
      const payload = this.jwtService.decode(token) as Partial<JwtAuthPayload>;

      return (
        this.authService.verifyAccessToken(token) &&
        user !== undefined &&
        payload.twoFactorAuthenticated
      );
    }

    return false;
  }
}
