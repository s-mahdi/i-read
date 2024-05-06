import { ERole } from './ERole';

export interface IUser {
  id: number;
  username: string;
  name: string;
  lastName: string;
  role: ERole;
  readVerses: Array<any>;
  schedule: Array<{
    date: string;
    isRead: boolean;
    suraList: string[];
    startVerseId: number;
  }>;
}
