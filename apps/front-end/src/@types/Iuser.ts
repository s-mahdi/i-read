import { ERole } from './ERole';

export interface IUser {
  id: number;
  username: string;
  name: string;
  lastName: string;
  role: ERole;
  rank: string;
  readVerses: Array<any>;
  schedules: Array<{
    id: number;
    date: string;
    isRead: boolean;
    suraList: string[];
    startVerseId: number;
  }>;
}
