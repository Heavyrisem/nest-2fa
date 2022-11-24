import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ConfigurationModule } from '~modules/config/config.module';
import { JwtMiddleware } from '~modules/jwt/jwt.middleware';
import { JwtModule } from '~modules/jwt/jwt.module';
import { LoggerMiddleware } from '~modules/logging/logger.middleware';

import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.ForRoot({ privateKey: Buffer.from(process.env.JWT_SECRET, 'base64').toString() }),
    UserModule,
    TestModule,
  ],
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
