import { AppBar, Avatar, Box, Container, Toolbar } from '@mui/material';
import MemoLogo from './Logo';
import { IUser } from '@/@types/Iuser';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';

interface IProps {
  user: IUser;
}

export const Navbar: React.FC<IProps> = ({ user }) => {
  const router = useRouter();

  const goToHomePage = () => router.push('/');
  return (
    <AppBar
      className="flex  justify-center bg-primary h-[72px]"
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
          <Box className="flex items-center gap-x-2">
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
              <PersonIcon />
            </Avatar>
            <p className="text-white">{`${user.name} ${user.lastName}`}</p>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
