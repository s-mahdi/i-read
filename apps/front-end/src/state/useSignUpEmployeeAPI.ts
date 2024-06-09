import { ISignUpEmployeeFormParams } from '@/@types/ISignUpEmployeeFormParams';
import { authAPI } from '@/httpClient/authAPI';
import {
  UseMutationOptions,
  useMutation,
  MutationFunction,
} from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';

type Data = AxiosResponse<any, any>;
type Param = ISignUpEmployeeFormParams;
type Errors = AxiosError<never>;

type SignUpMutationFn = MutationFunction<Data, Param>;

type Options = Omit<
  UseMutationOptions<Data, Errors, Param, SignUpMutationFn>,
  'mutationFn'
> & {
  onMutate?: (variables: Param) => SignUpMutationFn | Promise<SignUpMutationFn>;
};

export const useSignUpEmployeeAPI = (options?: Options) => {
  return useMutation<Data, Errors, Param, SignUpMutationFn>({
    mutationFn: async (params) => {
      const res = await authAPI.signUpEmployee(params);
      return res;
    },
    ...options,
  });
};
