import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '~modules/database/database.module';
import { LoggerService } from '~modules/logging/logger.service';
import { TotpModule } from '~modules/totp/totp.module';
import { User } from '~src/user/user.entity';
import { UserModule } from '~src/user/user.module';
import { UserService } from '~src/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    TotpModule.ForRoot({ digits: 6, period: Number(process.env.TWO_FACTOR_PERIOD) }),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LoggerService],
  exports: [AuthService],
})
export class AuthModule {}
