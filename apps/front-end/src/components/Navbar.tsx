import { AppBar, Avatar, Box, Container, Toolbar } from '@mui/material';
import MemoLogo from './Logo';
import { IUser } from '@/@types/Iuser';
import PersonIcon from '@mui/icons-material/Person';

interface IProps {
  user: IUser;
}

export const Navbar: React.FC<IProps> = ({ user }) => {
  return (
    <AppBar
      className="flex  justify-center bg-white h-[72px]"
      position="static"
    >
      <Container>
        <Toolbar className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <MemoLogo fontSize={48} primary />
            <p className="text-primary">من قرآن می‌خوانم</p>
          </div>
          <Box className="flex items-center gap-x-2">
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
              <PersonIcon />
            </Avatar>
            <p className="text-gray-600">{`${user.name} ${user.lastName}`}</p>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
