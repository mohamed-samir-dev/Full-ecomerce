import { motion, AnimatePresence } from 'framer-motion';
import {SearchBar} from '../components/SearchBar';
import { NavigationLinks } from '../components/NavigationLinks';
import { UserMenu } from '../components/UserMenu';
import { LanguageToggle } from '../components/LanguageToggle';
import DarkModeToggle from '../buttons/DarkModeToggle';
import {MobileMenuProps}from '../types/navbar.types'


export default function MobileMenu({
  isOpen,
  isArabic,
  isDarkMode,
  user,
  language,
  logout,
  toggleLanguage,
  toggleDarkMode,
  closeMobileMenu
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={`md:hidden border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="px-4 pt-3 pb-3 space-y-3">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SearchBar 
                isArabic={isArabic}
                isDarkMode={isDarkMode}
                isMobile={true}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <NavigationLinks 
                isArabic={isArabic} 
                isDarkMode={isDarkMode} 
                isMobile={true}
                onLinkClick={closeMobileMenu}
              />
            </motion.div>
            
            <motion.div 
              className={`max-[300px]:block hidden pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <UserMenu 
                user={user}
                logout={logout}
                isArabic={isArabic}
                isDarkMode={isDarkMode}
                isMobile={true}
                isInMobileMenu={true}
              />
            </motion.div>
            
            <motion.div 
              className={`flex items-center justify-center gap-4 pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <LanguageToggle 
                language={language}
                toggleLanguage={() => {
                  toggleLanguage();
                  closeMobileMenu();
                }}
                isArabic={isArabic}
                isDarkMode={isDarkMode}
              />
              <DarkModeToggle 
                isDarkMode={isDarkMode}
                toggleDarkMode={() => {
                  toggleDarkMode();
                  closeMobileMenu();
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
