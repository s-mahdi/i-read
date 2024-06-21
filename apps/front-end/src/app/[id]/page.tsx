'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ReadingBox } from '@/components/ReadingBox';
import { LoaderLayout } from '@/layouts/LoaderLayout';
import { useProfileAPI } from '@/state/useProfile';
import { useFinishScheduleAPI } from '@/state/useFinishScheduleAPI';
import { useVersesAPI } from '@/state/useVersesAPI';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Actions = ({
  onBackClick,
  onFinishClick,
}: {
  onBackClick: () => void;
  onFinishClick: () => void;
}) => (
  <>
    <button
      className="text-white border border-white px-2 py-1 rounded bg-inherit hover:bg-white hover:text-primary transition-colors duration-300"
      onClick={onBackClick}
    >
      بازگشت
    </button>
    <button
      className="text-white border border-white px-2 py-1 rounded bg-inherit hover:bg-white hover:text-primary transition-colors duration-300"
      onClick={onFinishClick}
    >
      اتمام قرائت
    </button>
  </>
);

const QuranPage = ({ params }: any) => {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error,
  } = useProfileAPI();
  const { mutateAsync: finishSchedule } = useFinishScheduleAPI();
  const { data: versesData, isLoading: isVersesLoading } = useVersesAPI(
    params.id
  );
  const router = useRouter();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [currentSura, setCurrentSura] = useState(0);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken || error?.response?.status === 401) {
      localStorage.clear();
      router.push('/login');
    }
  }, [error?.response?.status, router]);

  if (
    !profileData?.data ||
    !versesData ||
    isProfileLoading ||
    isVersesLoading
  ) {
    return <LoaderLayout />;
  }

  const uniqueSuras = Array.from(
    new Set(versesData.map((verse) => verse.sura))
  );
  const suraDataArray = uniqueSuras.map((uniqueSura) => ({
    sura: uniqueSura,
    verses: versesData.filter(({ sura }) => uniqueSura === sura),
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
    <div className="bg-primary bg-fixed bg-[url('/login-bg.png')] bg-cover min-h-screen">
      <Navbar user={profileData.data}>
        <Actions onBackClick={onBackClick} onFinishClick={onFinishClick} />
      </Navbar>
      <div className="container mx-auto py-8 space-y-8 px-4">
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
      </div>
      <Footer />
      <div className="fixed bottom-0 left-0 right-0 bg-primary md:hidden">
        <div className="container mx-auto px-4">
          <button
            className="text-white bg-inherit w-full h-full p-4"
            onClick={onFinishClick}
          >
            اتمام قرائت
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuranPage;
