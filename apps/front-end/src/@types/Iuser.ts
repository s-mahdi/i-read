import { ERole } from './ERole';
import { ICounty } from './ICounty';
import { IProvince } from './IProvince';

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
  province: IProvince | null;
  county: ICounty | null;
  unit: IUser | null;
}
