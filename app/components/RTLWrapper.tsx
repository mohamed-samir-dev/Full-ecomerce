'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function RTLWrapper({ children }: { children: React.ReactNode }) {
  const { isArabic } = useLanguage();
  return <div dir={isArabic ? 'rtl' : 'ltr'}>{children}</div>;
}
