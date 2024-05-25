'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ReadingBox } from '@/components/ReadingBox';
import { LoaderLayout } from '@/layouts/LoaderLayout';
import { useProfileAPI } from '@/state/useProfile';
import { useFinishScheduleAPI } from '@/state/useFinishScheduleAPI';
import { useVersesAPI } from '@/state/useVersesAPI';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const QuranPage = ({ params }: any) => {
  const { data: profileData, isLoading } = useProfileAPI();
  const { mutateAsync: finishSchedule } = useFinishScheduleAPI();
  const { data } = useVersesAPI(params.id);
  const router = useRouter();

  if (!profileData?.data || !data || isLoading) {
    return <LoaderLayout />;
  }

  const uniqueSuras = new Set(data.map((verse) => verse.sura));

  const onBackClick = () => {
    router.push('/');
  };

  const onFinishClick = async () => {
    try {
      await finishSchedule(Number(params.id));
      router.push('/');
    } catch (e) {
      console.error(e);
    }
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
          onClick={onFinishClick}
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
