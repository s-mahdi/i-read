'use client';

import { Navbar } from '@/components/Navbar';
import { ReadingBox } from '@/components/ReadingBox';
import { useProfileAPI } from '@/state/useProfile';
import { useVersesAPI } from '@/state/useVersesAPI';
import { Box, CircularProgress, Container } from '@mui/material';

// TODO: we need to take schedule id, not startVerseId!
const QuranPage = ({ params }: any) => {
  const { data: profileData, isLoading } = useProfileAPI();
  const { data } = useVersesAPI(params.id);

  if (!profileData || !data || isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  const uniqueSuras = new Set(data.map((verse) => verse.sura));

  return (
    <div>
      <Navbar user={profileData} />
      <Container className="py-8 space-y-8">
        {Array.from(uniqueSuras).map((uniqueSura, i) => (
          <ReadingBox
            sura={uniqueSura}
            verses={data.filter(({ sura }) => uniqueSura === sura)}
            key={i}
          />
        ))}
      </Container>
    </div>
  );
};

export default QuranPage;
