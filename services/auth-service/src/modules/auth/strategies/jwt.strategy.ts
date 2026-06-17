import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserType } from 'src/generated/prisma/enums';
import { JwtPayload } from '../types/jwt-payload.type';

type RawJwtPayload = {
  sub?: unknown;
  email?: unknown;
  type?: unknown;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: RawJwtPayload): JwtPayload {
    if (
      typeof payload.sub !== 'string' ||
      typeof payload.email !== 'string' ||
      !this.isValidUserType(payload.type)
    ) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      type: payload.type,
    };
  }

  private isValidUserType(value: unknown): value is UserType {
    return (
      value === UserType.STUDENT ||
      value === UserType.PROFESSOR ||
      value === UserType.ADMIN
    );
  }
}
