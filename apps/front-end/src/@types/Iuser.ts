import { ERole } from './ERole';

export interface IUser {
  id: number;
  username: string;
  name: string;
  lastName: string;
  role: ERole;
  readVerses: Array<any>;
}
