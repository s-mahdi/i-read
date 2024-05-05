import { Box, Container } from '@mui/material';

export const Footer = () => {
  return (
    <Box className="bg-primaryDark p-4" component="footer">
      <Container>
        <p className="text-primaryLight text-end">
          تهیه شده در عقیدتی سیاسی فرماندهی انتظامی استان همدان
        </p>
      </Container>
    </Box>
  );
};
