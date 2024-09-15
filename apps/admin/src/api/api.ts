import { IAnalytics } from "../@types/IAnalytics";
import { ICountiesAnalytics } from "../@types/ICountiesAnalytics";
import { IProvincesAnalytics } from "../@types/IProvincesAnalytics";
import { IUnitsAnalytics } from "../@types/IUnitsAnalytics";
import { axiosClient } from "./axiosClient";

export const api = {
  getAnalytics: () => axiosClient.get<IAnalytics>("/analytics"),
  getProvincesAnalytics: () =>
    axiosClient.get<IProvincesAnalytics>("/analytics/provinces"),
  getCountiesAnalytics: (provinceId: number) =>
    axiosClient.get<ICountiesAnalytics>(`/analytics/counties/${provinceId}`),
  getUnitsAnalytics: (provinceId: number, unitId: number, countyId?: number) =>
    axiosClient.get<IUnitsAnalytics>(`/analytics/units/${provinceId}`, {
      params: {
        unitId,
        countyId,
      },
    }),
};
