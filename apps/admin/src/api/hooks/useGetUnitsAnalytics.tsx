import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { IUnitsAnalytics } from "../../@types/IUnitsAnalytics";
import { api } from "../api";

type QueryKeyType = [string, number, number, number?];

const queryFn = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyType>): Promise<IUnitsAnalytics> => {
  const [, provinceId, unitId, countyId] = queryKey;
  const { data } = await api.getUnitsAnalytics(provinceId, unitId, countyId);
  return data;
};

export const useGetUnitsAnalytics = (
  provinceId: number,
  unitId: number,
  countyId?: number
) => {
  return useQuery<IUnitsAnalytics, Error, IUnitsAnalytics, QueryKeyType>({
    queryKey: ["unitsAnalytics", provinceId, unitId, countyId],
    queryFn,
  });
};
