import type { Metadata } from 'next';
import localFont from '@next/font/local';
import './global.css';
import ReactQueryProvider from '@/state/ReactQueryProvider';

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
        <body className={`${yekan.variable} font-sans`}>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
