import { IUser } from '@/@types/Iuser';
import { userAPI } from '@/httpClient/userAPI';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const GET_PROFILE_QUERY_KEY = 'GET_PROFILE_QUERY_KEY';
type TData = IUser | undefined;
type TError = AxiosError<any>;
type Options = Omit<
  DefinedInitialDataOptions<TData, TError>,
  'queryKey' | 'queryFn'
>;

export const useProfileAPI = (options?: Options) =>
  useQuery<TData, TError>({
    queryKey: [GET_PROFILE_QUERY_KEY],
    queryFn: async () => {
      try {
        const res = await userAPI.getProfile();
        if (res.status === 200) {
          return res.data;
        }
      } catch (e) {
        return Promise.reject(e);
      }
    },
    ...options,
  });
