import { useQuery } from "@tanstack/react-query";
import { IProvincesAnalytics } from "../../@types/IProvincesAnalytics";
import { api } from "../api";

const queryFn = async (): Promise<IProvincesAnalytics> => {
  const { data } = await api.getAnalytics();
  return data;
};

export const useGetProvincesAnalytics = () => {
  return useQuery<IProvincesAnalytics>({
    queryKey: ["provincesAnalytics"],
    queryFn,
  });
};
