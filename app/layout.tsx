import type { Metadata } from 'next';
import { Cinzel, Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { WishlistProvider } from '@/context/WishlistContext';
import { CompareProvider } from '@/context/CompareContext';
import { QuoteProvider } from '@/context/QuoteContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActionBar } from '@/components/layout/FloatingActionBar';
import { GlobalModals } from '@/components/modals/GlobalModals';

const cinzel = Cinzel({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JYOTHI TILES | Luxury Digital Showroom — Tiles, Granite & Slabs',
  description:
    'Experience premier architectural surfaces, large-format porcelain slabs, and exotic natural Brazilian granites at Jyothi Tiles. Discover curated collections, compare matrix, and VIP showroom concierge.',
  keywords: [
    'jyothi tiles',
    'luxury tiles',
    'granite slabs',
    'sintered stone',
    'large format tiles',
    'calacatta marble tiles',
    'architectural surfaces'
  ],
  openGraph: {
    title: 'JYOTHI TILES | Luxury Digital Showroom',
    description: 'Surfaces That Define Space — Tiles, Granite, Marble & Sintered Stone.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'],
  },
};

import { AdminDataProvider } from '@/context/AdminDataContext';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0D0D0F] text-[#EBE7DF] selection:bg-[#C5A880] selection:text-black">
        <AuthProvider>
          <AdminDataProvider>
            <WishlistProvider>
              <CompareProvider>
                <QuoteProvider>
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <FloatingActionBar />
                  <GlobalModals />
                  <Footer />
                </QuoteProvider>
              </CompareProvider>
            </WishlistProvider>
          </AdminDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

