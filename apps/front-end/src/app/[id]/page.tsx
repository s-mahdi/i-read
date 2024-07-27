'use client';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ReadingBox } from '@/components/ReadingBox';
import { LoaderLayout } from '@/layouts/LoaderLayout';
import { useProfileAPI } from '@/state/useProfile';
import { useVersesAPI } from '@/state/useVersesAPI';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NavbarActions } from './navbarActions';
import { api } from '@/httpClient/api';

const QuranPage = ({ params }: any) => {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error,
  } = useProfileAPI();
  const { data: versesData, isLoading: isVersesLoading } = useVersesAPI(
    params.id
  );
  const router = useRouter();
  const [playingIndex, setPlayingIndex] = useState<{
    sura: number;
    verse: number;
  } | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken || error?.status === 401) {
      localStorage.clear();
      router.push('/login');
    }
  }, [error?.status, router]);

  useEffect(() => {
    if (playingIndex !== null) {
      const { sura, verse } = playingIndex;
      const audioKey = `${sura}-${verse}`;
      const currentAudio = audioRefs.current[audioKey];

      if (currentAudio) {
        currentAudio.play();
      }

      Object.keys(audioRefs.current).forEach((key) => {
        if (key !== audioKey) {
          const audio = audioRefs.current[key];
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        }
      });
    } else {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    }
  }, [playingIndex]);

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

  const handlePlay = (suraIndex: number, verseIndex: number) => {
    if (
      playingIndex !== null &&
      playingIndex.sura === suraIndex &&
      playingIndex.verse === verseIndex
    ) {
      setPlayingIndex(null);
    } else {
      setPlayingIndex({ sura: suraIndex, verse: verseIndex });
    }
  };

  const handleAudioEnded = (suraIndex: number, verseIndex: number) => {
    const nextIndex = verseIndex + 1;
    const currentSuraData = suraDataArray[suraIndex];

    if (currentSuraData && nextIndex < currentSuraData.verses.length) {
      setPlayingIndex({ sura: suraIndex, verse: nextIndex });
    } else if (suraIndex + 1 < suraDataArray.length) {
      setPlayingIndex({ sura: suraIndex + 1, verse: 0 });
    } else {
      setPlayingIndex(null);
    }
  };

  const onBackClick = () => {
    router.push('/');
  };

  const onFinishClick = async () => {
    try {
      await api.schedule.finishSchedule(Number(params.id));
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-primary bg-fixed bg-[url('/login-bg.png')] bg-cover min-h-screen">
      <Navbar user={profileData.data}>
        <NavbarActions
          onBackClick={onBackClick}
          onFinishClick={onFinishClick}
        />
      </Navbar>
      <div className="container mx-auto py-8 space-y-8 px-4">
        {suraDataArray.map((suraData, suraIndex) => (
          <ReadingBox
            key={suraIndex}
            sura={suraData.sura}
            verses={suraData.verses}
            playingIndex={
              playingIndex && playingIndex.sura === suraIndex
                ? playingIndex.verse
                : null
            }
            handlePlay={(verseIndex) => handlePlay(suraIndex, verseIndex)}
            handleAudioEnded={(verseIndex) =>
              handleAudioEnded(suraIndex, verseIndex)
            }
            audioRefs={audioRefs}
            suraIndex={suraIndex}
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
