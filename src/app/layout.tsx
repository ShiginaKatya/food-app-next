import { Roboto } from 'next/font/google';

import './globals.scss';
import QueryProvider from '@/providers/QueryProvider';
import Header from '@components/Header';

const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <QueryProvider>
          <div className="app">
            <Header />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
