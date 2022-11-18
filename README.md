<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) 2FA Example

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# production mode with docker-compose
$ docker-compose up -d
```

## Usage

#### Step 1

계정 등록을 위해 서버로 계정 등록 요청을 보냅니다 <br>
`POST http://localhost:3000/user/register`

```
{
  "email": "test@example.com",
  "name": "test",
  "password": "pw",
}
```

정상적으로 등록이 된 경우, 2fa private Key와 등록이 가능한 2fa url이 반환됩니다.

```
{
  "result": {
    "twoFactorKey": "NNGHARSHOZGVA5CQJZBHMUCUJBGWWZRUKR3DO6BVKBTHQT2KOJ3Q",
    "twoFactorUrl": "otpauth://totp/Nest-2FA 테스트?secret=NNGHARSHOZGVA5CQJZBHMUCUJBGWWZRUKR3DO6BVKBTHQT2KOJ3Q&issuer=NEST-2FA&algorithm=SHA1&digits=6&period=30"
  }
}
```

twoFactorKey를 바로 OTP클라이언트에 등록하거나, twoFactorUrl을 QR 형태로 변환하여 OTP클라이언트에 등록 가능합니다.

#### Step 2

OTP 클라이언트에 표시된 OTP CODE를 앞서 등록한 계정 정보와 함께 전송합니다. <br>
`POST http://localhost:3000/user/login `

```
{
  "email": "test@example.com",
  "password": "pw",
  "twoFactorCode": "035579" // YOUR 2FA CODE
}
```

정상적으로 인증이 완료되면 jwt 토큰 정보가 반환됩니다.

```
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwibmFtZSI6InRlc3QiLCJpYXQiOjE2Njg3NTUyMjl9.a3kfquIFIB5BQEsGQn1IRbOTud7LyTkn5VkBjkF0R25Q47x_mK25IZIIoYM7gpJkaInNCA8To_FgeO_c-A3vKmVOrWzBCS7dAYVKxp_nrFxXGBAqeTlnJlD9ZUzNC8grEi4XGwvvIv2uTC4F2L3hy6Q_kRLvXtCFgfSDAGQmXOKXtG46ZFmtkHuxksmtVpchVjFP8zIUTWj8cefx2WNkrdalRdR3UKbFNIjdTenPobEFsgwIOwEefQ1dUP-ztMPdHdQu8lA7YkNbn4XTfrEIOeDmHDwMR6_bY6igCrJDcKxbOrGH6ruPh4mtERdqEeCXCoZZyFpP3jipvzQqYrHm7w"
}
```
