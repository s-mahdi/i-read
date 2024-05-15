import { ISignUpFormParams } from '@/@types/ISignUpFormParams';
import { axiosClient } from './axios';
import { IForgetPasswordParams } from '@/@types/IForgetPasswordParams';

interface LoginResponse {
  access_token: string;
}

export const authAPI = {
  login: (username: string, password: string) =>
    axiosClient.post<LoginResponse>('/auth/login', { username, password }),
  signUp: (params: ISignUpFormParams) =>
    axiosClient.post<any>('/auth/signup', params),
  forgetPassword: (params: IForgetPasswordParams) =>
    axiosClient.post('/auth/forget-password', params),
};
