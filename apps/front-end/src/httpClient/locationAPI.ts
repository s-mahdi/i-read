import { axiosClient } from './axios';

export const locationAPI = {
  getProvinces: () => axiosClient.get(`/provinces`),
  getCounties: (provinceId: number | string) =>
    axiosClient.get(`/counties/province/${provinceId}`),
};
