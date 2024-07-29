import React, { useEffect, useRef } from 'react';
import VerseIcon from './icons/VerseIcon';
import { toIndiaDigits } from '@/function/toIndiaDigits';
import MemoPause from './icons/Pause';
import MemoPlay from './icons/Play';
import { IVerse } from '@/@types/IVerse';

interface IProps {
  sura: string;
  verses: IVerse[];
  playingIndex: { suraId: number; order: number } | null;
  handlePlay: (suraId: number, order: number) => void;
}

const BISMILLAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';

export const ReadingBox = ({
  sura,
  verses,
  playingIndex,
  handlePlay,
}: IProps) => {
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (playingIndex !== null) {
      const currentVerseRef = verseRefs.current.find(
        (ref, index) =>
          ref !== null &&
          verses[index]?.suraId === playingIndex.suraId &&
          verses[index].order === playingIndex.order
      );
      if (currentVerseRef) {
        currentVerseRef.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [playingIndex, verses]);

  const hasBismillah =
    verses.length > 0 &&
    verses[0]?.text.startsWith(BISMILLAH) &&
    verses[0]?.text !== BISMILLAH;

  return (
    <div className="shadow-xl rounded-2xl overflow-hidden">
      <div className="bg-gray-100 p-4">
        <p className="font-semibold text-lg text-gray-800 text-center">
          {sura}
        </p>
        {hasBismillah && (
          <p className="text-center text-gray-800 font-taha text-2xl mt-2">
            {BISMILLAH}
          </p>
        )}
      </div>
      <div className="flex flex-col bg-white bg-opacity-85 gap-y-8 p-8">
        {verses.map(({ text, translation, order, suraId, id }, index) => {
          const isBismillah = text.startsWith(BISMILLAH);
          const verseText =
            isBismillah && text !== BISMILLAH
              ? text.replace(BISMILLAH, '').trim()
              : text;

          return (
            <div
              ref={(el) => {
                verseRefs.current[index] = el;
              }}
              className={`flex flex-col gap-y-4 transition-all duration-500 ${
                playingIndex &&
                playingIndex.suraId === suraId &&
                playingIndex.order === order
                  ? 'bg-primary-100 text-primary'
                  : 'text-gray-900'
              }`}
              key={index}
            >
              <div className="flex items-center gap-x-4">
                {order !== 0 && (
                  <div className="relative w-fit">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm">
                      {toIndiaDigits(order)}
                    </span>
                    <VerseIcon fontSize={40} />
                  </div>
                )}
                <p
                  className={`text-4xl font-taha ${
                    playingIndex &&
                    playingIndex.suraId === suraId &&
                    playingIndex.order === order
                      ? 'text-primary'
                      : 'text-gray-900'
                  }`}
                >
                  {verseText}
                </p>
              </div>
              <p
                className={`${
                  playingIndex &&
                  playingIndex.suraId === suraId &&
                  playingIndex.order === order
                    ? 'text-primary'
                    : 'text-gray-900'
                }`}
              >
                {`${order !== 0 ? toIndiaDigits(order) : ''}. ${translation}`}
              </p>
              <div className="flex flex-row-reverse">
                <div className="tooltip" data-tooltip="پخش">
                  <button
                    onClick={() => handlePlay(suraId, order)}
                    className="focus:outline-none"
                  >
                    {playingIndex &&
                    playingIndex.suraId === suraId &&
                    playingIndex.order === order ? (
                      <MemoPause fill="#32B7C5" fontSize="32" />
                    ) : (
                      <MemoPlay fill="#32B7C5" fontSize="32" />
                    )}
                  </button>
                </div>
              </div>
              <hr className="border-[0.5px] border-gray-300 w-full mt-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
