'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const router = useRouter();
  useEffect(() => {
    const isAuth = Boolean(window.localStorage.getItem('access_token'));
    console.log('isAuth: ', isAuth);
    if (!isAuth) {
      router.replace('/login');
    }
  }, [router]);
}
