import 'modern-normalize';
import './globals.css';
import Header from '@/components/Header/Header';
import GeolocationChecker from '@/components/GeolocationChecker/GeolocationChecker';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GeolocationChecker />
        <Header />
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
