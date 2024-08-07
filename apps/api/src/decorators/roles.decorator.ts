import { SetMetadata } from '@nestjs/common';
import { Role } from '../@types/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
