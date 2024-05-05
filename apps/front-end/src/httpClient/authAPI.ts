import { axiosClient } from './axios';

interface LoginResponse {
  access_token: string;
}

export const authAPI = {
  login: (username: string, password: string) =>
    axiosClient.post<LoginResponse>('/auth/login', { username, password }),
};
