import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Da Nang Drivers | Private Drivers & Tours in Central Vietnam',
  description:
    'Book trusted private drivers for airport transfers, day trips, and tours in Da Nang, Hoi An, Hue, and Central Vietnam. Professional English-speaking drivers with modern vehicles.',
  keywords:
    'Da Nang driver, Hoi An driver, private driver Vietnam, airport transfer Da Nang, Ba Na Hills tour, My Son tour, Hai Van Pass, Central Vietnam tours',
  openGraph: {
    title: 'Da Nang Drivers | Private Drivers & Tours in Central Vietnam',
    description:
      'Book trusted private drivers for airport transfers, day trips, and tours in Da Nang, Hoi An, and Central Vietnam.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
