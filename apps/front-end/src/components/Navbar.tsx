import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import MemoLogo from './Logo';
import { IUser } from '@/@types/Iuser';
import ExitToApp from '@mui/icons-material/ExitToApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MemoPerson from './Person';
import MemoArrowDown from './ArrowDown';
import MemoExit from './Exit';

interface IProps {
  user: IUser;
  children?: React.ReactNode;
}

export const Navbar: React.FC<IProps> = ({ user, children }) => {
  const router = useRouter();
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const goToHomePage = useCallback(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsBoxOpen(false);
      }
    };

    if (isBoxOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBoxOpen]);

  const onSignOut = useCallback(() => {
    localStorage.clear();
    router.push('/login');
  }, [router]);

  const { name, lastName } = user;

  return (
    <div className="sticky top-0 z-10 flex justify-center bg-primary h-[72px]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-full px-4">
          <div
            onClick={goToHomePage}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <MemoLogo fontSize={48} />
            <p className="text-white">من قرآن می‌خوانم</p>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden md:flex gap-x-2">{children}</div>
            <div
              ref={boxRef}
              className="flex items-center gap-x-2 relative cursor-pointer"
              onClick={() => setIsBoxOpen(!isBoxOpen)}
            >
              <div className="bg-primary-main rounded-full mr-1">
                <MemoPerson fontSize={32} fill="white" />
              </div>
              <MemoArrowDown fontSize={24} fill="white" />
              <p className="text-white">{`${name} ${lastName}`}</p>
              {isBoxOpen && (
                <div className="w-64 absolute left-0 top-[64px] border border-gray-300 bg-white p-4 rounded-xl shadow-lg z-10">
                  <button
                    className="flex items-center bg-white w-full text-left px-2 py-2 gap-2"
                    onClick={onSignOut}
                  >
                    <MemoExit fontSize={24} />
                    <p>خروج از حساب کاربری</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
