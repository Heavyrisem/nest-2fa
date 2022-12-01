import { Request } from 'express';
import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '~src/user/user.entity';

import { JwtAuthPayload } from '../auth.interface';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class TwoFactorAuthGuard extends JwtAuthGuard implements CanActivate {
  constructor(readonly authService: AuthService, readonly jwtService: JwtService) {
    super(authService);
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (!super.canActivate(context)) return false;

    const request: Request & { user?: User } = context.switchToHttp().getRequest();
    const user: User | undefined = request.user;

    const { authorization } = request.headers;
    if (authorization) {
      const [_, token] = authorization.split(' ');
      const payload = this.jwtService.decode(token) as Partial<JwtAuthPayload>;

      return user !== undefined && payload.twoFactorAuthenticated;
    }

    return false;
  }
}
