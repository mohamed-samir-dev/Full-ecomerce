import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import {Navbar} from "./navbar";
import {Footer} from "./footer";
import {Providers} from "./providers";
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { TranslationProvider } from '@/i18n';
import RTLWrapper from './components/RTLWrapper';
import { geistSans, geistMono } from './utils/fonts';
import { WebVitals } from './utils/performance';
import Analytics, { FacebookPixel } from './components/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://full-ecomerce-gamma.vercel.app'),
  title: {
    default: 'Global Shop - متجر عالمي للتسوق الإلكتروني',
    template: '%s | Global Shop'
  },
  description: 'متجر إلكتروني شامل يوفر أفضل المنتجات من ملابس رجالية ونسائية وأطفال، أحذية، إكسسوارات، إلكترونيات ومستلزمات الحيوانات الأليفة بأسعار تنافسية وجودة عالية',
  keywords: ['تسوق أونلاين', 'متجر إلكتروني', 'ملابس رجالية', 'ملابس نسائية', 'ملابس أطفال', 'أحذية', 'إكسسوارات', 'إلكترونيات', 'مستلزمات حيوانات', 'online shopping', 'ecommerce', 'fashion'],
  authors: [{ name: 'Global Shop' }],
  creator: 'Mohammed Samier',
  publisher: 'Global Shop',  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US'],
    url: 'https://full-ecomerce-gamma.vercel.app',
    siteName: 'Global Shop',
    title: 'Global Shop - متجر عالمي للتسوق الإلكتروني',
    description: 'متجر إلكتروني شامل يوفر أفضل المنتجات من ملابس، أحذية، إكسسوارات، إلكترونيات ومستلزمات الحيوانات الأليفة',
    images: [{
      url: '/images/logo.avif',
      width: 1200,
      height: 630,
      alt: 'Global Shop',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Shop - متجر عالمي للتسوق الإلكتروني',
    description: 'متجر إلكتروني شامل يوفر أفضل المنتجات بأسعار تنافسية',
    images: ['/images/logo.avif'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/images/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" sizes="180x180" />
        <link rel="preload" as="image" href="/images/hero-1.webp" fetchPriority="high" />
        <link rel="preconnect" href="https://backend-for-global-shop-production-a385.up.railway.app" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://backend-for-global-shop-production-a385.up.railway.app" />
        <link rel="preconnect" href="https://i.ibb.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ibb.co" />
        <link rel="canonical" href="https://full-ecomerce-gamma.vercel.app" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Global Shop',
              url: 'https://full-ecomerce-gamma.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://full-ecomerce-gamma.vercel.app/shop?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Global Shop',
              url: 'https://full-ecomerce-gamma.vercel.app',
              logo: 'https://full-ecomerce-gamma.vercel.app//images/logo.avif',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <TranslationProvider>
              <Providers>
              <Analytics />
              <FacebookPixel />
              <WebVitals />
              <Toaster position="top-right" toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }} />
              <Navbar />
              <RTLWrapper>
                {children}
              </RTLWrapper>
              <Footer />
              </Providers>
            </TranslationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
