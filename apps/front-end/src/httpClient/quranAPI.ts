import { axiosClient } from './axios';
import { IVerse } from '@/@types/IVerse';

export const quranAPI = {
  getVerses: (page?: number, pageSize?: number) =>
    axiosClient.get<IVerse[]>(`/verses`, { params: { page, pageSize } }),
};
