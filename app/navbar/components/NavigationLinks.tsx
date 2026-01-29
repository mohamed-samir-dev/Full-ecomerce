'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {NavigationLinksProps}from '../types/navbar.types'


export const NavigationLinks = ({ isArabic, isDarkMode, isMobile = false, isTablet = false, onLinkClick }: NavigationLinksProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  
  const links = [
    { href: '/', label: isArabic ? 'الرئيسية' : 'Home' },
    { href: '/products', label: isArabic ? 'المتجر' : 'Shop' },
    { href: '/about', label: isArabic ? 'من نحن' : 'About' },
    { href: '/contact', label: isArabic ? 'اتصل بنا' : 'Contact' }
  ];

  const displayLinks = (mounted && isArabic && !isMobile) ? [...links].reverse() : links;

  const containerClass = isMobile 
    ? 'space-y-1' 
    : isTablet
    ? `flex items-center gap-4`
    : `hidden lg:flex items-center justify-center gap-8`;

  const linkClass = isMobile
    ? `flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-colors cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`
    : isTablet
    ? `text-sm md:text-base font-medium transition-colors cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white' 
          : 'text-gray-600 hover:text-gray-900'
      }`
    : `text-sm md:text-base lg:text-lg font-medium transition-colors cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white' 
          : 'text-gray-600 hover:text-gray-900'
      }`;

  return (
    <div className={containerClass}>
      {displayLinks.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass} onClick={onLinkClick}>
          {String(link.label)}
        </Link>
      ))}
    </div>
  );
};
