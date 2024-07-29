'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ReadingBox } from '@/components/ReadingBox';
import { LoaderLayout } from '@/layouts/LoaderLayout';
import { useProfileAPI } from '@/state/useProfile';
import { useVersesAPI } from '@/state/useVersesAPI';
import { NavbarActions } from './navbarActions';
import { api } from '@/httpClient/api';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import useAudioPlayer from '@/hooks/useAudioPlayer';
import { IVerse } from '@/@types/IVerse';

interface SuraData {
  sura: string;
  verses: IVerse[];
}

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
  const [currentSura, setCurrentSura] = useState(0);

  useAuthRedirect(error?.status);

  const uniqueSuras = Array.from(
    new Set(versesData?.map((verse: IVerse) => verse.sura) ?? [])
  );
  const suraDataArray: SuraData[] = uniqueSuras.map((uniqueSura) => ({
    sura: uniqueSura,
    verses: versesData?.filter(({ sura }: IVerse) => uniqueSura === sura) ?? [],
  }));

  const { audioRef, playingIndex, handlePlay, setPlayingIndex } =
    useAudioPlayer({
      verses: versesData ?? [],
    });

  if (
    !profileData?.data ||
    isProfileLoading ||
    isVersesLoading ||
    !versesData
  ) {
    return <LoaderLayout />;
  }

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
        {suraDataArray.map((suraData, i) => (
          <ReadingBox
            key={i}
            sura={suraData.sura}
            verses={suraData.verses}
            playingIndex={playingIndex}
            handlePlay={(suraId: number, order: number) =>
              handlePlay(suraId, order)
            }
          />
        ))}
      </div>
      <audio ref={audioRef} />
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
