import React, { useEffect, useRef } from 'react';
import { Typography, Tooltip, IconButton } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VerseIcon from './VerseIcon';
import { toIndiaDigits } from '@/function/toIndiaDigits';

interface IVerse {
  text: string;
  translation: string;
  order: number;
  audioUrl: string;
}

interface IProps {
  sura: string;
  verses: IVerse[];
  playingIndex: number | null;
  handlePlay: (index: number) => void;
  handleAudioEnded: (index: number) => void;
}

export const ReadingBox = ({
  sura,
  verses,
  playingIndex,
  handlePlay,
  handleAudioEnded,
}: IProps) => {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (playingIndex !== null) {
      audioRefs.current[playingIndex]?.play();
      verseRefs.current[playingIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    audioRefs.current.forEach((audio, index) => {
      if (!audio) return;
      if (index === playingIndex) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }, [playingIndex]);

  return (
    <div className="shadow-xl rounded-2xl overflow-hidden ">
      <div className="bg-gray-100 p-4">
        <p className="font-semibold text-lg text-gray-800 text-center">
          {sura}
        </p>
      </div>
      <div className="flex flex-col bg-white bg-opacity-85 gap-y-8 p-8">
        {verses.map(({ text, translation, order, audioUrl }, index) => (
          <div
            ref={(el) => {
              verseRefs.current[index] = el;
            }}
            className={`flex flex-col gap-y-4 transition-all duration-500 ${
              index === playingIndex
                ? 'bg-primary-100 text-primary'
                : 'text-gray-900'
            }`}
            key={index}
          >
            <audio
              ref={(el) => {
                audioRefs.current[index] = el!;
              }}
              src={`${process.env.NEXT_PUBLIC_API_URL}${audioUrl}`}
              crossOrigin="anonymous"
              onEnded={() => handleAudioEnded(index)}
            />
            <div className="flex items-center gap-x-4">
              <div className="relative w-fit">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm">
                  {toIndiaDigits(order)}
                </span>
                <VerseIcon fontSize={40} />
              </div>
              <Typography
                className={`text-4xl font-taha ${
                  index === playingIndex ? 'text-primary' : 'text-gray-900'
                }`}
              >
                {text}
              </Typography>
            </div>
            <p
              className={`${
                index === playingIndex ? 'text-primary' : 'text-gray-900'
              }`}
            >{`${toIndiaDigits(order)}. ${translation}`}</p>
            <div className="flex flex-row-reverse">
              <Tooltip title="پخش" enterDelay={500} leaveDelay={200}>
                <IconButton onClick={() => handlePlay(index)}>
                  {playingIndex === index ? (
                    <PauseIcon
                      fontSize="large"
                      sx={{ color: 'primary.main' }}
                    />
                  ) : (
                    <PlayIcon fontSize="large" sx={{ color: 'primary.main' }} />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <hr className="border-[0.5px] border-gray-300 w-full mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
