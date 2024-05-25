import { axiosClient } from './axios';
import { IVerse } from '@/@types/IVerse';

export const quranAPI = {
  getVerses: (page?: number, pageSize?: number) =>
    axiosClient.get<IVerse[]>(`/verses`, { params: { page, pageSize } }),
  getVersesByScheduleId: (scheduleId: number, pageSize?: number) =>
    axiosClient.get<IVerse[]>(`/verses/by-schedule/${scheduleId}`, {
      params: { pageSize },
    }),
};
