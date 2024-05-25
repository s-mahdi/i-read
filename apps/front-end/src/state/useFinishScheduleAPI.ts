import { scheduleAPI } from '@/httpClient/scheduleAPI';
import {
  useMutation,
  UseMutationOptions,
  MutationFunction,
} from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';

type Data = AxiosResponse<any, any>;
type Param = number;
type Errors = AxiosError<never>;

type FinishScheduleMutationFn = MutationFunction<Data, Param>;

type Options = Omit<
  UseMutationOptions<Data, Errors, Param, FinishScheduleMutationFn>,
  'mutationFn'
> & {
  onMutate?: (
    variables: Param
  ) => FinishScheduleMutationFn | Promise<FinishScheduleMutationFn>;
};

export const useFinishScheduleAPI = (options?: Options) => {
  return useMutation<Data, Errors, Param, FinishScheduleMutationFn>({
    mutationFn: async (id) => {
      const res = await scheduleAPI.finishSchedule(id);
      return res;
    },
    ...options,
  });
};
