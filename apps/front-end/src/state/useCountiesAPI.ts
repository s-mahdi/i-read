import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '@/httpClient/api';
import { ICounty } from '@/@types/ICounty';

interface IProps {
  provinceId?: number | string;
}

export const useCountiesAPI = ({ provinceId }: IProps) => {
  const [data, setData] = useState<AxiosResponse<ICounty[]>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        if (provinceId) {
          const res = await api.location.getCounties(provinceId);
          setData(res);
        }
      } catch (err: any) {
        setError(err?.response);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [provinceId]);

  return { data, isLoading: loading, error };
};
