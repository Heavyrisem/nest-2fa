import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { JwtAuthPayload } from '../auth.interface';

export const JwtPayload = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.payload as JwtAuthPayload;
});
