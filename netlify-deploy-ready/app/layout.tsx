import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeContext';
import { Toaster } from 'sonner';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import NewsDrawer from '@/components/NewsDrawer';
import TradingViewTicker from '@/components/TradingViewTicker';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://finpulseadvisory.netlify.app'),
  title: 'FinPulse Research | Premier Stock Advisory, F&O & Commodity Research',
  description:
    'Institutional-grade stock market recommendations, Nifty/BankNifty option buying & selling strategies, cash swing trades, and MCX commodity levels. Verified 89.6% win rate with strict risk-reward management.',
  keywords: [
    'Stock Advisory',
    'Bank Nifty Options',
    'FinPulse Research',
    'Equity Swing Trading',
    'SEBI Compliance',
    'Stock Market Tips India',
    'Commodity Advisory MCX',
  ],
  authors: [{ name: 'FinPulse Research Desk' }],
  openGraph: {
    title: 'FinPulse Research | Stock Market Advisory & F&O Intelligence',
    description:
      'High-conviction Equity, Options & Commodity advisory with real-time Telegram/WhatsApp alerts and strict risk management.',
    url: 'https://finpulse-research.com',
    siteName: 'FinPulse Research',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'FinPulse Research Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-white">
        <ThemeProvider>
          {/* Top Fixed TradingView Live Ticker Tape */}
          <TradingViewTicker />
          
          {children}

          {/* Floating Groww-Style News Drawer */}
          <NewsDrawer />

          {/* Floating WhatsApp Widget */}
          <WhatsAppWidget />

          {/* Toast Notifications Container */}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
