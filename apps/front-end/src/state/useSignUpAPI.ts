import { ISignUpFormParams } from '@/@types/ISignUpFormParams';
import { api } from '@/httpClient/api';
import {
  UseMutationOptions,
  useMutation,
  MutationFunction,
} from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';

type Data = AxiosResponse<any, any>;
type Param = ISignUpFormParams;
type Errors = AxiosError<never>;

type SignUpMutationFn = MutationFunction<Data, Param>;

type Options = Omit<
  UseMutationOptions<Data, Errors, Param, SignUpMutationFn>,
  'mutationFn'
> & {
  onMutate?: (variables: Param) => SignUpMutationFn | Promise<SignUpMutationFn>;
};

export const useSignUpAPI = (options?: Options) => {
  return useMutation<Data, Errors, Param, SignUpMutationFn>({
    mutationFn: async (params) => {
      const res = await api.auth.signUp(params);
      return res;
    },
    ...options,
  });
};
