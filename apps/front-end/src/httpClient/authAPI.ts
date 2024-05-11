import { ISignUpFormParams } from '@/@types/ISignUpFormParams';
import { axiosClient } from './axios';

interface LoginResponse {
  access_token: string;
}

export const authAPI = {
  login: (username: string, password: string) =>
    axiosClient.post<LoginResponse>('/auth/login', { username, password }),
  signUp: (params: ISignUpFormParams) =>
    axiosClient.post<any>('/auth/signup', params),
};
