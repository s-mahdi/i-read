import { Box, Container } from '@mui/material';

export const Footer = () => {
  return (
    <Box className="bg-primaryDark p-4" component="footer">
      <Container>
        <p className="text-primaryLight text-end">
          سازمان عقیدتی سیاسی فرماندهی انتظامی جمهوری اسلامی ایران
        </p>
      </Container>
    </Box>
  );
};
