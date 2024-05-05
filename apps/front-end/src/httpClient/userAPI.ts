import { axiosClient } from './axios';

export const userAPI = {
  getUser: (id: string) => axiosClient.get(`/user/${id}`),
};
