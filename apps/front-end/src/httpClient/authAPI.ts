import { ISignUpFormParams } from '@/@types/ISignUpFormParams';
import { axiosClient } from './axios';
import { IForgetPasswordParams } from '@/@types/IForgetPasswordParams';
import { ISignUpEmployeeFormParams } from '@/@types/ISignUpEmployeeFormParams';

interface LoginResponse {
  access_token: string;
}

export const authAPI = {
  login: (username: string, password: string) =>
    axiosClient.post<LoginResponse>('/auth/login', { username, password }),
  signUp: (params: ISignUpFormParams) =>
    axiosClient.post<any>('/auth/signup', params),
  signUpEmployee: (params: ISignUpEmployeeFormParams) =>
    axiosClient.post<any>('/auth/signup-employee', params),
  forgetPassword: (params: IForgetPasswordParams) =>
    axiosClient.post('/auth/forget-password', params),
};
