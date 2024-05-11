'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#32B7C5',
    },
  },
  typography: {
    fontFamily: ['Yekan', 'Taha', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
