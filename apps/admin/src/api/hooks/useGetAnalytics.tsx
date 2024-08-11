import { useQuery } from "@tanstack/react-query";
import { IAnalytics } from "../../@types/IAnalytics";
import { api } from "../api";

const queryFn = async (): Promise<IAnalytics> => {
  const { data } = await api.getAnalytics();
  return data;
};

export const useGetAnalytics = () => {
  return useQuery<IAnalytics>({
    queryKey: ["analytics"],
    queryFn,
  });
};
