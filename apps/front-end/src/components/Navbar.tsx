import { AppBar, Avatar, Box, Button, Container, Toolbar } from '@mui/material';
import MemoLogo from './Logo';
import { IUser } from '@/@types/Iuser';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import ExitToApp from '@mui/icons-material/ExitToApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface IProps {
  user: IUser;
}

export const Navbar: React.FC<IProps> = ({ user }) => {
  const router = useRouter();
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const goToHomePage = () => router.push('/');

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

  const onSignOut = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <AppBar
      className="flex justify-center bg-primary h-[72px]"
      position="sticky"
    >
      <Container>
        <Toolbar className="flex justify-between">
          <div
            onClick={goToHomePage}
            className="flex items-center gap-x-2 hover:cursor-pointer"
          >
            <MemoLogo fontSize={48} />
            <p className="text-white">من قرآن می‌خوانم</p>
          </div>
          <Box
            ref={boxRef}
            className="flex items-center gap-x-2 relative"
            component="button"
            onClick={() => setIsBoxOpen(!isBoxOpen)}
          >
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1, cursor: 'pointer' }}>
              <PersonIcon />
            </Avatar>
            <KeyboardArrowDownIcon sx={{ fill: 'white' }} />
            <p className="text-white">{`${user.name} ${user.lastName}`}</p>
            {isBoxOpen && (
              <Box
                className="w-64 absolute left-0 top-[64px] border border-gray-300 bg-white p-4 rounded-xl shadow-lg"
                zIndex={10}
              >
                <Button className="flex" onClick={onSignOut}>
                  <ExitToApp className="ml-4" />
                  خروج از حساب کاربری
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
