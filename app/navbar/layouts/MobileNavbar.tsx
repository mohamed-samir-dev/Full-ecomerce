import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from '../components/Logo';
import { UserMenu } from '../components/UserMenu';
import WishlistButton from '../buttons/WishlistButton';
import CartButton from '../buttons/CartButton';
import {MobileNavbarProps}from '../types/navbar.types'


export default function MobileNavbar({
  isArabic,
  isDarkMode,
  cartCount,
  user,
  logout,
  isMobileMenuOpen,
  toggleMobileMenu
}: MobileNavbarProps) {
  return (
    <div className={`md:hidden flex items-center justify-between h-14 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
        <Logo isArabic={isArabic} isDarkMode={isDarkMode} />
      </div>
      
      <div className={`flex items-center ${isArabic ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
        <div className="min-[301px]:block hidden">
          <UserMenu 
            user={user}
            logout={logout}
            isArabic={isArabic}
            isDarkMode={isDarkMode}
            isMobile={true}
          />
        </div>
        
        <WishlistButton isDarkMode={isDarkMode} size="sm" />
        <CartButton cartCount={cartCount} isDarkMode={isDarkMode} isArabic={isArabic} size="xs" />
        
        <motion.button
          onClick={toggleMobileMenu}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            isDarkMode 
              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
