import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '24h' },
};
