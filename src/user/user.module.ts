import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TotpModule } from '~modules/totp/totp.module';
import { DatabaseModule } from '~src/modules/database/database.module';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    TotpModule.ForRoot({ digits: 6, period: Number(process.env.TWO_FACTOR_PERIOD) }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
