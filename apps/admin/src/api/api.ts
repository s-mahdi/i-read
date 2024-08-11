import { IAnalytics } from "../@types/IAnalytics";
import { axiosClient } from "./axiosClient";

export const api = {
  getAnalytics: () => axiosClient.get<IAnalytics>("/analytics"),
};
