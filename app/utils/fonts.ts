import { Geist, Geist_Mono, Almarai } from 'next/font/google';

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  fallback: ['monospace'],
  adjustFontFallback: true,
});

export const almarai = Almarai({
  variable: '--font-almarai',
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800'],
  display: 'swap',
  preload: true,
});
