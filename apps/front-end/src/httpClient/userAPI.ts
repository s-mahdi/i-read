import { IUser } from '@/@types/Iuser';
import { axiosClient } from './axios';
import { IUpdateUser } from '@/@types/IUpdateUser';

export const userAPI = {
  getProfile: () => axiosClient.get<IUser>(`/user/profile`),
  updateProfile: (data: IUpdateUser) =>
    axiosClient.patch('/user/profile', data),
};
