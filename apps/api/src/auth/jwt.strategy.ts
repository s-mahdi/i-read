import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO: fix it on production
      secretOrKey:
        'bVc+cTaDgSGfhnInfMVFSE7pwWi6pznTtAycpFevxqhwIERmuOMfcNgX3hs5dhml',
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, username: payload.username }; // Customize based on your user entity
  }
}
