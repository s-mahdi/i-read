import { Box, Container } from '@mui/material';

export const Footer = () => {
  return (
    <Box className="bg-primaryDark p-4" component="footer">
      <Container>
        <p className="text-primaryLight text-end">
          تولید شده در معاونت ٰتربیت و آموزش سا.ع.س فراجا
        </p>
      </Container>
    </Box>
  );
};
