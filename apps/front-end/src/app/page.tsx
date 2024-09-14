'use client';

import { DayCard } from '@/components/DayCard';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { LoaderLayout } from '@/layouts/LoaderLayout';
import { useProfileAPI } from '@/state/useProfile';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function HomePage() {
  const { data: res, isLoading, error } = useProfileAPI();
  const router = useRouter();
  const isIntranet = process.env.NEXT_PUBLIC_IS_INTRANET_MODE === 'true';

  const onCardClick = (scheduleId: number) => router.push(`/${scheduleId}`);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken || error?.status === 401) {
      localStorage.clear();
      router.push('/login');
    }
  }, [error?.status, router]);

  if (!res?.data || isLoading) {
    return <LoaderLayout />;
  }

  const { province, county, unit } = res.data;

  const isProfileIncomplete =
    province === null || county === null || unit === null;

  if (isProfileIncomplete && isIntranet) {
    router.push('/signup/complete');
  }

  const data = res.data;

  return (
    <div>
      <Navbar user={data} />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.schedules.map(({ date, suraList, isRead, id }, index) => (
            <div key={index}>
              <DayCard
                isRead={isRead}
                date={new Date(date)}
                suraList={suraList.join(', ')}
                onClick={() => onCardClick(id)}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
