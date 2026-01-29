import { Logo } from '../components/Logo';
import { SearchBar } from '../components/SearchBar';
import { NavigationLinks } from '../components/NavigationLinks';
import NavbarActions from '../buttons/NavbarActions';
import {DesktopNavbarProps}from '../types/navbar.types'


export default function DesktopNavbar({
  isArabic,
  isDarkMode,
  searchQuery,
  setSearchQuery,
  cartCount,
  user,
  toggleLanguage,
  toggleDarkMode,
  logout
}: DesktopNavbarProps) {
  return (
    <div className={`hidden lg:flex items-center h-16 gap-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center min-w-fit ${isArabic ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
        <Logo isArabic={isArabic} isDarkMode={isDarkMode} />
      </div>

      <div className="flex flex-1 max-w-md">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isArabic={isArabic}
          isDarkMode={isDarkMode}
        />
      </div>

      <NavigationLinks 
        isArabic={isArabic} 
        isDarkMode={isDarkMode} 
      />

      <div className={isArabic ? 'mr-auto' : 'ml-auto'}>
        <NavbarActions 
          isArabic={isArabic}
          isDarkMode={isDarkMode}
          cartCount={cartCount}
          user={user}
          toggleLanguage={toggleLanguage}
          toggleDarkMode={toggleDarkMode}
          logout={logout}
        />
      </div>
    </div>
  );
}
