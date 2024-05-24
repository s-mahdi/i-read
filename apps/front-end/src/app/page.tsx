'use client';

import { DayCard } from '@/components/DayCard';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { LoaderLayout } from '@/layouts/LoaderLayout';
import { useProfileAPI } from '@/state/useProfile';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function HomePage() {
  const { data: res, isLoading, error } = useProfileAPI();
  const router = useRouter();

  const onCardClick = (verseId: number) => router.push(`/${verseId}`);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken || error?.response?.status === 401) {
      localStorage.clear();
      router.push('/login');
    }
  }, [error?.response?.status, router]);

  if (!res?.data || isLoading) {
    return <LoaderLayout />;
  }

  const data = res.data;

  return (
    <div>
      <Navbar user={data} />
      <Container className="py-8">
        <Grid container spacing={3}>
          {data.schedules.map(({ date, suraList }, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <DayCard
                date={new Date(date)}
                suraList={suraList.join(', ')}
                onClick={() => onCardClick(index + 1)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
