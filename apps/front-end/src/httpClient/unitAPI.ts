import { axiosClient } from './axios';

export const unitAPI = {
  getUnits: () => axiosClient.get(`/units`),
};
