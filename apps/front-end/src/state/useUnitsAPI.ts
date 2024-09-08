import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '@/httpClient/api';
import { IUnit } from '@/@types/IUnit';

export const useUnitsAPI = () => {
  const [data, setData] = useState<AxiosResponse<IUnit[]>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await api.units.getUnits();
        setData(res);
      } catch (err: any) {
        setError(err?.response);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  return { data, isLoading: loading, error };
};
