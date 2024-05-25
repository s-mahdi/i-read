import { Card } from '@mui/material';
import React from 'react';
import VerseIcon from './VerseIcon';
import VerifiedIcon from '@mui/icons-material/Verified';

interface IProps {
  date: Date;
  suraList: string;
  isRead: boolean;
  onClick: () => void;
}

export const DayCard = ({ date, suraList, isRead, onClick }: IProps) => {
  return (
    <Card
      elevation={4}
      className="min-h-[88px] px-4 py-6 rounded-xl hover:bg-gray-100 transition-colors duration-300 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-x-2">
          <div className="relative w-fit">
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {new Intl.DateTimeFormat('fa-IR', {
                day: 'numeric',
              }).format(date)}
            </p>
            <VerseIcon fontSize={40} />
          </div>
          <p>
            {new Intl.DateTimeFormat('fa-IR', {
              month: 'short',
            }).format(date)}
          </p>
          {isRead && <VerifiedIcon color="primary" />}
        </div>

        <p>{suraList}</p>
      </div>
    </Card>
  );
};
