import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { ConfigurationModule } from '~modules/config/config.module';
import { LoggerMiddleware } from '~modules/logging/logger.middleware';

import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/middleware/jwt.middleware';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, UserModule, TestModule, AuthModule, JwtModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
