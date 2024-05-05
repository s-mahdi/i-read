import type { Metadata } from 'next';
import localFont from '@next/font/local';
import './global.css';
import ReactQueryProvider from '@/state/ReactQueryProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const yekan = localFont({
  src: [
    {
      path: '../../public/fonts/Yekan.ttf',
    },
  ],
  variable: '--font-yekan',
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
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <body className={`${yekan.variable} font-sans`}>{children}</body>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </ReactQueryProvider>
    </html>
  );
}
