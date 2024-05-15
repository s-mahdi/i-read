import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants: JwtModuleOptions = {
  // TODO: fix it on production
  secret: 'bVc+cTaDgSGfhnInfMVFSE7pwWi6pznTtAycpFevxqhwIERmuOMfcNgX3hs5dhml',
  signOptions: { expiresIn: '24h' },
};
