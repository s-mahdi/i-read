import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { api } from "../api";
import { ICountiesAnalytics } from "../../@types/ICountiesAnalytics";

type QueryKeyType = [string, number];

const queryFn = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyType>): Promise<ICountiesAnalytics> => {
  const [, provinceId] = queryKey;
  const { data } = await api.getCountiesAnalytics(provinceId);
  return data;
};

export const useGetCountiesAnalytics = (provinceId: number) => {
  return useQuery<ICountiesAnalytics, Error, ICountiesAnalytics, QueryKeyType>({
    queryKey: ["countiesAnalytics", provinceId],
    queryFn,
  });
};
