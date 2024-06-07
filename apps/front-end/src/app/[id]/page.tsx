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
import { useState } from 'react';

const QuranPage = ({ params }: any) => {
  const { data: profileData, isLoading } = useProfileAPI();
  const { mutateAsync: finishSchedule } = useFinishScheduleAPI();
  const { data } = useVersesAPI(params.id);
  const router = useRouter();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [currentSura, setCurrentSura] = useState(0);

  if (!profileData?.data || !data || isLoading) {
    return <LoaderLayout />;
  }

  const uniqueSuras = Array.from(new Set(data.map((verse) => verse.sura)));
  const suraDataArray = uniqueSuras.map((uniqueSura) => ({
    sura: uniqueSura,
    verses: data.filter(({ sura }) => uniqueSura === sura),
  }));

  const handlePlay = (index: number) => {
    setPlayingIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAudioEnded = (index: number) => {
    const nextIndex = index + 1;
    const currentSuraData = suraDataArray[currentSura];

    if (currentSuraData && nextIndex < currentSuraData.verses.length) {
      setPlayingIndex(nextIndex);
    } else if (currentSura + 1 < suraDataArray.length) {
      setCurrentSura(currentSura + 1);
      setPlayingIndex(0);
    } else {
      setPlayingIndex(null);
    }
  };

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
        {suraDataArray.map((suraData, i) => (
          <ReadingBox
            key={i}
            sura={suraData.sura}
            verses={suraData.verses}
            playingIndex={currentSura === i ? playingIndex : null}
            handlePlay={handlePlay}
            handleAudioEnded={handleAudioEnded}
          />
        ))}
      </Container>
      <Footer />
    </div>
  );
};

export default QuranPage;
