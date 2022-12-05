import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRES: Joi.number().default(1000 * 60 * 10), // 10m
        JWT_REFRESH_EXPIRES: Joi.number().default(1000 * 60 * 60), // 1h
        JWT_COOKIE_EXPIRES: Joi.number().default(60 * 60), // 1h
        TWO_FACTOR_PERIOD: Joi.number().default(30),
      }),
    }),
  ],
})
export class ConfigurationModule {}
