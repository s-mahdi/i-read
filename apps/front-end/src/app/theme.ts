'use client';

import { createTheme } from '@mui/material/styles';

// TODO fix font
const fontURL = '../../public/fonts/Yekan.ttf';

const theme = createTheme({
  palette: {
    primary: {
      main: '#32B7C5',
    },
  },
  typography: {
    fontFamily: 'Yekan, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Yekan';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url('${fontURL}') format('ttf');
        }
      `,
    },
  },
});

export default theme;
