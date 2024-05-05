import { IUser } from '@/@types/Iuser';
import { axiosClient } from './axios';

export const userAPI = {
  getProfile: () => axiosClient.get<IUser>(`/user/profile`),
};
