'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ReadingBox } from '@/components/ReadingBox';
import { LoaderLayout } from '@/layouts/LoaderLayout';
import { useProfileAPI } from '@/state/useProfile';
import { useVersesAPI } from '@/state/useVersesAPI';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

// TODO: we need to take schedule id, not startVerseId!
const QuranPage = ({ params }: any) => {
  const { data: profileData, isLoading } = useProfileAPI();
  const { data } = useVersesAPI(params.id);
  const router = useRouter();

  if (!profileData?.data || !data || isLoading) {
    return <LoaderLayout />;
  }

  const uniqueSuras = new Set(data.map((verse) => verse.sura));

  const onBackClick = () => {
    router.push('/');
  };

  return (
    <div className="bg-primary bg-fixed bg-[url('/login-bg.png')] bg-cover">
      <Navbar user={profileData.data}>
        <Button
          className="text-white border border-white px-2"
          onClick={onBackClick}
        >
          بازگشت
        </Button>
        <Button
          className="text-white border border-white px-2"
          onClick={onBackClick}
        >
          اتمام قرائت
        </Button>
      </Navbar>
      <Container className="py-8 space-y-8">
        {Array.from(uniqueSuras).map((uniqueSura, i) => (
          <ReadingBox
            sura={uniqueSura}
            verses={data.filter(({ sura }) => uniqueSura === sura)}
            key={i}
          />
        ))}
      </Container>
      <Footer />
    </div>
  );
};

export default QuranPage;
