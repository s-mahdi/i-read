import { axiosClient } from './axios';

export const locationAPI = {
  getProvinces: () => axiosClient.get(`/provinces`),
  getCounties: (provinceId: number) =>
    axiosClient.get(`/counties/${provinceId}`),
};
