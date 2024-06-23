import { IUser } from '@/@types/Iuser';
import { api } from '@/httpClient/api';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const GET_PROFILE_QUERY_KEY = 'GET_PROFILE_QUERY_KEY';
type TData = AxiosResponse<IUser | undefined>;
type TError = AxiosError<any>;
type Options = Omit<
  DefinedInitialDataOptions<TData, TError>,
  'queryKey' | 'queryFn'
>;

export const useProfileAPI = (options?: Options) =>
  useQuery<TData, TError>({
    queryKey: [GET_PROFILE_QUERY_KEY],
    queryFn: async () => api.user.getProfile(),
    ...options,
  });
