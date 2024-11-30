import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: 'http://localhost:8080/realms/reports-realm',
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri:
          'http://keycloak:8080/realms/reports-realm/protocol/openid-connect/certs',
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
      }),
    } as StrategyOptions);
  }

  async validate(payload: any) {
    return payload;
  }
}
