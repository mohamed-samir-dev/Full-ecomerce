'use client';

import { useState } from 'react';
import DesktopNavbar from './layouts/DesktopNavbar';
import TabletNavbar from './layouts/TabletNavbar';
import MobileNavbar from './layouts/MobileNavbar';
import MobileMenu from './layouts/MobileMenu';

export default function Navbar() {
  const [isArabic, setIsArabic] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(0);
  const [user] = useState<{ name: string; isAdmin?: boolean } | null>(null);

  const toggleLanguage = () => setIsArabic(!isArabic);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const logout = () => console.log('Logout');

  return (
    <nav className={`${
      isDarkMode 
        ? 'bg-[#191C21] text-white border-gray-700' 
        : 'bg-white text-gray-900 border-gray-200'
    } border-b sticky top-0 z-50 transition-all duration-300 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DesktopNavbar 
          isArabic={isArabic}
          isDarkMode={isDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          user={user}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          logout={logout}
        />

        <TabletNavbar 
          isArabic={isArabic}
          isDarkMode={isDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          user={user}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          logout={logout}
        />

        <MobileNavbar 
          isArabic={isArabic}
          isDarkMode={isDarkMode}
          cartCount={cartCount}
          user={user}
          logout={logout}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        <MobileMenu 
          isOpen={isMobileMenuOpen}
          isArabic={isArabic}
          isDarkMode={isDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          user={user}
          logout={logout}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </nav>
  );
}
