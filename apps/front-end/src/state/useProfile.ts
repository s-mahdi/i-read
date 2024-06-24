import { useEffect, useState } from 'react';
import { IUser } from '@/@types/Iuser';
import { api } from '@/httpClient/api';
import { AxiosError, AxiosResponse } from 'axios';

export const useProfileAPI = () => {
  const [data, setData] = useState<AxiosResponse<IUser>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.user.getProfile();
        setData(res);
      } catch (err: any) {
        setError(err?.response);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return { data, isLoading: loading, error };
};
