import { randomBytes } from 'crypto';

import { encode } from 'hi-base32';
import { default as totp } from 'totp-generator';

import { Inject, Injectable } from '@nestjs/common';

import { CONFIG_OPTIONS } from './totp.constants';

@Injectable()
export class TotpService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: TotpModuleOptions) {}

  getCode(key: string) {
    return totp(key, {
      ...this.options,
    });
  }

  getURL(key: string, label = 'Nest-2FA 테스트', issuer = 'NEST-2FA') {
    return `otpauth://totp/${label}?secret=${key}&issuer=${issuer}&algorithm=SHA1&digits=${this.options.digits}&period=${this.options.period}`;
  }

  private generateSecretASCII(length = 32, symbols = false) {
    const bytes = randomBytes(length);
    let set = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    if (symbols) {
      set += '!@#$%^&*()<>?/[]{},.:;';
    }

    let output = '';
    for (let i = 0, l = bytes.length; i < l; i++) {
      output += set[Math.floor((bytes[i] / 255.0) * (set.length - 1))];
    }
    return output;
  }

  generateSecret() {
    const key = this.generateSecretASCII();
    return encode(key).split('=').join('');
  }
}
