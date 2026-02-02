'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import DesktopNavbar from './layouts/DesktopNavbar';
import TabletNavbar from './layouts/TabletNavbar';
import MobileNavbar from './layouts/MobileNavbar';
import MobileMenu from './layouts/MobileMenu';

export default function Navbar() {
  const { user: authUser, logout: authLogout } = useAuth();
  const [isArabic, setIsArabic] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = authUser ? { name: authUser.name, isAdmin: authUser.role === 'admin' } : null;

  const toggleLanguage = () => setIsArabic(!isArabic);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const logout = () => {
    authLogout();
    localStorage.removeItem('localAdminLoggedIn');
    window.location.href = '/';
  };

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
          cartCount={mounted ? itemCount : 0}
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
          cartCount={mounted ? itemCount : 0}
          user={user}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          logout={logout}
        />

        <MobileNavbar 
          isArabic={isArabic}
          isDarkMode={isDarkMode}
          cartCount={mounted ? itemCount : 0}
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
