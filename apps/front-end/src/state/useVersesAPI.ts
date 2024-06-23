import { IVerse } from '@/@types/IVerse';
import { api } from '@/httpClient/api';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const GET_VERSES_QUERY_KEY = 'GET_VERSES_QUERY_KEY';
type TData = IVerse[] | undefined;
type TError = AxiosError<any>;
type Options = Omit<
  DefinedInitialDataOptions<TData, TError>,
  'queryKey' | 'queryFn'
>;

export const useVersesAPI = (scheduleId: number, options?: Options) =>
  useQuery<TData, TError>({
    queryKey: [GET_VERSES_QUERY_KEY],
    queryFn: async () => {
      try {
        const res = await api.quran.getVersesByScheduleId(scheduleId);
        if (res.status === 200) {
          return res.data;
        }
      } catch (e) {
        return Promise.reject(e);
      }
    },
    ...options,
  });
