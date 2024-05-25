import type { Metadata } from 'next';
import localFont from '@next/font/local';
import './global.css';
import ReactQueryProvider from '@/state/ReactQueryProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const yekan = localFont({
  src: [
    {
      path: '../../public/fonts/Yekan.ttf',
    },
  ],
  variable: '--font-yekan',
});

const taha = localFont({
  src: [
    {
      path: '../../public/fonts/Taha.ttf',
    },
  ],
  variable: '--font-taha',
});

export const metadata: Metadata = {
  title: 'من قرآن میخوانم',
  description: 'قرآت روزانه ۵۰ آیه از قرآن کریم',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={`${yekan.variable} ${taha.variable} font-sans`}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
