'use client';

import { DayCard } from '@/components/DayCard';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { useProfileAPI } from '@/state/useProfile';
import { Box, CircularProgress, Container, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';

function HomePage() {
  const { data, isLoading } = useProfileAPI();
  const router = useRouter();

  const onCardClick = (verseId: number) => router.push(`/${verseId}`);

  if (!data || isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Navbar user={data} />
      <Container className="py-8">
        <Grid container spacing={3}>
          {data.schedule.map(({ date, suraList, startVerseId }, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <DayCard
                date={new Date(date)}
                suraList={suraList.join(', ')}
                onClick={() => onCardClick(startVerseId)}
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
