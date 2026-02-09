'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  isArabic: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'EN';
    }
    return 'EN';
  });

  useEffect(() => {
    const isAr = language === 'AR';
    const dir = isAr ? 'rtl' : 'ltr';
    const lang = isAr ? 'ar' : 'en';
    
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.dir = dir;
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'EN' ? 'AR' : 'EN';
    console.log('Toggle language from', language, 'to', newLang);
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, isArabic: language === 'AR', toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
