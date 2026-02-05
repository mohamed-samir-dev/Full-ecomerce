import { LanguageToggle } from '../components/LanguageToggle';
import DarkModeToggle from '../buttons/DarkModeToggle';
import WishlistButton from '../buttons/WishlistButton';
import CartButton from '../buttons/CartButton';
import { UserMenu } from '../components/UserMenu';
import {NavbarActionsProps}from '../types/navbar.types'


export default function NavbarActions({
  isArabic,
  isDarkMode,
  cartCount,
  user,
  language,
  toggleLanguage,
  toggleDarkMode,
  logout,
  size = 'md'
}: NavbarActionsProps) {
  const spacing = size === 'sm' ? 'space-x-3' : 'space-x-4';
  
  return (
    <div className={`flex items-center ${isArabic ? `flex-row-reverse space-x-reverse ${spacing}` : spacing}`}>
      <LanguageToggle 
        language={language}
        toggleLanguage={toggleLanguage}
        isArabic={isArabic}
        isDarkMode={isDarkMode}
      />
      <DarkModeToggle 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        size={size === 'sm' ? 'sm' : 'md'}
      />
      <WishlistButton 
        isDarkMode={isDarkMode}
        size={size === 'sm' ? 'sm' : 'md'}
      />
      <CartButton 
        cartCount={cartCount}
        isDarkMode={isDarkMode}
        isArabic={isArabic}
        size={size}
      />
      <UserMenu 
        user={user}
        logout={logout}
        isArabic={isArabic}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
