import { Logo } from '../components/Logo';
import { SearchBar } from '../components/SearchBar';
import { NavigationLinks } from '../components/NavigationLinks';
import NavbarActions from '../buttons/NavbarActions';
import {TabletNavbarProps}from '../types/navbar.types'


export default function TabletNavbar({
  isArabic,
  isDarkMode,
  cartCount,
  user,
  language,
  toggleLanguage,
  toggleDarkMode,
  logout
}: TabletNavbarProps) {
  return (
    <div className="hidden md:block lg:hidden">
      {/* First Row: Logo and Icons */}
      <div className={`flex items-center justify-between h-14 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
          <Logo isArabic={isArabic} isDarkMode={isDarkMode} />
        </div>
        
        <NavbarActions 
          isArabic={isArabic}
          isDarkMode={isDarkMode}
          cartCount={cartCount}
          user={user}
          language={language}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          logout={logout}
          size="sm"
        />
      </div>
      
      {/* Second Row: Search and Navigation Links */}
      <div className={`flex items-center justify-between h-12 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className="flex-1 max-w-sm">
          <SearchBar 
            isArabic={isArabic}
            isDarkMode={isDarkMode}
          />
        </div>
        <NavigationLinks 
          isArabic={isArabic} 
          isDarkMode={isDarkMode}
          isTablet={true}
        />
      </div>
    </div>
  );
}
