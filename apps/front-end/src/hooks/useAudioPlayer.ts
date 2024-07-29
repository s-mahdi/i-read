import { useEffect, useRef, useState } from 'react';
import { IVerse } from '@/@types/IVerse';

interface UseAudioPlayerProps {
  verses: IVerse[];
}

interface PlayingIndex {
  suraId: number;
  order: number;
}

const useAudioPlayer = ({ verses }: UseAudioPlayerProps) => {
  const [playingIndex, setPlayingIndex] = useState<PlayingIndex | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (playingIndex !== null && audioRef.current) {
      const currentVerse = verses.find(
        (verse) =>
          verse.suraId === playingIndex.suraId &&
          verse.order === playingIndex.order
      );

      if (currentVerse) {
        audioRef.current.src = currentVerse.audioUrl;
        audioRef.current.play();
        audioRef.current.onended = () => {
          const currentVerseIndex = verses.findIndex(
            (verse) =>
              verse.suraId === playingIndex.suraId &&
              verse.order === playingIndex.order
          );
          const nextVerse = verses[currentVerseIndex + 1];

          if (nextVerse) {
            setPlayingIndex({
              suraId: nextVerse.suraId,
              order: nextVerse.order,
            });
          } else {
            setPlayingIndex(null);
          }
        };
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [playingIndex, verses]);

  const handlePlay = (suraId: number, order: number) => {
    if (playingIndex?.suraId === suraId && playingIndex?.order === order) {
      setPlayingIndex(null);
    } else {
      setPlayingIndex({ suraId, order });
    }
  };

  return {
    audioRef,
    playingIndex,
    handlePlay,
    setPlayingIndex,
  };
};

export default useAudioPlayer;
