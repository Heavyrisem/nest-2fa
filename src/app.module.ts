import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigurationModule } from './modules/config/config.module';
import { LoggerMiddleware } from './modules/logging/logger.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
