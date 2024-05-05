'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { useProfileAPI } from '@/state/useProfile';
import { Box, CircularProgress, Container } from '@mui/material';
import Typography from '@mui/material/Typography';

function HomePage() {
  const { data, isLoading } = useProfileAPI();

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
      <Container>
        <Typography variant="h4" component="h1" align="center" sx={{ mt: 4 }}>
          Welcome to My Next.js App
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          This is a simple Next.js app with an empty responsive Material UI
          navbar and footer.
        </Typography>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
