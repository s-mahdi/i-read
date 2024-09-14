import { ERole } from './ERole';

export interface IUpdateUser {
  name?: string;
  lastName?: string;
  username?: string;
  password?: string;
  nationalCode?: string;
  role?: ERole;
  province?: number;
  county?: number;
  unit?: number;
}
