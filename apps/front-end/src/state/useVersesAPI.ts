import { useEffect, useState } from 'react';
import { IVerse } from '@/@types/IVerse';
import { api } from '@/httpClient/api';
import { AxiosError } from 'axios';

export const useVersesAPI = (scheduleId: number) => {
  const [data, setData] = useState<IVerse[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const res = await api.quran.getVersesByScheduleId(scheduleId);
        setData(res.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [scheduleId]);

  return { data, isLoading: loading, error };
};
