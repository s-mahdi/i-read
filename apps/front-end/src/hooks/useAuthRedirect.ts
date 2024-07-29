import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuthRedirect = (errorStatus: number | undefined) => {
  const router = useRouter();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken || errorStatus === 401) {
      localStorage.clear();
      router.push('/login');
    }
  }, [errorStatus, router]);
};

export default useAuthRedirect;
