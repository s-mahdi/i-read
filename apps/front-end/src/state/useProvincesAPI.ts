import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '@/httpClient/api';
import { IProvince } from '@/@types/IProvince';

export const useProvincesAPI = () => {
  const [data, setData] = useState<AxiosResponse<IProvince[]>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await api.location.getProvinces();
        setData(res);
      } catch (err: any) {
        setError(err?.response);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return { data, isLoading: loading, error };
};
