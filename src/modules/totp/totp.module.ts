import { DynamicModule, Module } from '@nestjs/common';

import { CONFIG_OPTIONS } from './totp.constants';
import { TotpModuleOptions } from './totp.interface';
import { TotpService } from './totp.service';

@Module({})
export class TotpModule {
  static ForRoot(options: TotpModuleOptions): DynamicModule {
    return {
      module: TotpModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        TotpService,
      ],
      exports: [TotpService],
    };
  }
}
