import { Box, CircularProgress, Container } from '@mui/material';
import React from 'react';

export const LoaderLayout = () => {
  return (
    <Container className="flex h-screen items-center justify-center">
      <Box className="flex flex-col items-center gap-8">
        <CircularProgress color="primary" />
        <p>در حال بارگزاری</p>
      </Box>
    </Container>
  );
};
