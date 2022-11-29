import { NextFunction, Request, Response } from 'express';

import { Injectable, InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '~src/user/user.service';

import { JwtAuthPayload } from '../auth.interface';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization?.replace('Bearer ', '') || null;
      const refreshToken = req.cookies['refreshToken']?.replace('Bearer ', '') || null;
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);

      if (accessToken && refreshToken) {
        const decoded = this.jwtService.decode(accessToken) as Partial<JwtAuthPayload>;

        // TODO: access, refresh token 재발급 로직
        if (typeof decoded === 'object' && decoded['id']) {
          const user = await this.userService.findById(decoded.id);
          req['user'] = user;
        }
      }

      next();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Error With Parsing JWT');
    }
  }
}
