import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User as UserEntity } from '~src/user/user.entity';

export const GetUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user as UserEntity;
});
