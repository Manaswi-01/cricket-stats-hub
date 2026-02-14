import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CricketStats Hub - Comprehensive Cricket Statistics & Player Profiles',
  description: 'Explore detailed cricket statistics, player profiles, team rankings, and match analysis. Your ultimate source for cricket data and insights.',
  keywords: 'cricket statistics, cricket players, cricket teams, cricket matches, player stats, cricket rankings',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'CricketStats Hub - Cricket Statistics & Analysis',
    description: 'Comprehensive cricket statistics, player profiles, and match analysis',
    type: 'website',
    locale: 'en_US',
    siteName: 'CricketStats Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CricketStats Hub',
    description: 'Comprehensive cricket statistics and player profiles',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}