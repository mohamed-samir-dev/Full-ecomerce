'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAdminAuth } from './hooks/useAdminAuth';
import { getNavItems } from './utils/navItems';
import Sidebar from './components/Sidebar';
import MobileToggle from './components/MobileToggle';
import Overlay from './components/Overlay';
import AuthLoader from './components/AuthLoader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const isAuthorized = useAdminAuth();
  const navItems = getNavItems(isArabic);

  if (!isAuthorized) {
    return <AuthLoader isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <MobileToggle 
        isOpen={isSidebarOpen} 
        isDarkMode={isDarkMode} 
        isArabic={isArabic} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <Overlay isVisible={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          isDarkMode={isDarkMode} 
          isArabic={isArabic} 
          navItems={navItems}
          onClose={() => setIsSidebarOpen(false)} 
        />
        <main className="flex-1 w-full lg:w-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
