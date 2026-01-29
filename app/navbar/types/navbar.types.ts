export interface CartButtonProps {
  cartCount: number;
  isDarkMode: boolean;
  isArabic: boolean;
  size?: "xs" | "sm" | "md";
}
export interface NavbarActionsProps {
  isArabic: boolean;
  isDarkMode: boolean;
  cartCount: number;
  user: { name: string; isAdmin?: boolean } | null;
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  logout: () => void;
  size?: "xs" | "sm" | "md";
}
export interface WishlistButtonProps {
  isDarkMode: boolean;
  size?: "sm" | "md";
}
export interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  size?: "sm" | "md";
}
export interface LanguageToggleProps {
  language: string;
  toggleLanguage: () => void;
  isArabic: boolean;
  isDarkMode: boolean;
}
export interface LogoProps {
  isArabic: boolean;
  isDarkMode: boolean;
}

export interface NavigationLinksProps {
    isArabic: boolean;
    isDarkMode: boolean;
    isMobile?: boolean;
    isTablet?: boolean;
    onLinkClick?: () => void;
  }
  export interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isArabic: boolean;
    isDarkMode: boolean;
    isMobile?: boolean;
  }
 
  export interface DesktopNavbarProps {
    isArabic: boolean;
    isDarkMode: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    cartCount: number;
    user: { name: string; isAdmin?: boolean } | null;
    toggleLanguage: () => void;
    toggleDarkMode: () => void;
    logout: () => void;
  }
  export interface MobileMenuProps {
    isOpen: boolean;
    isArabic: boolean;
    isDarkMode: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    user: { name: string; isAdmin?: boolean } | null;
    logout: () => void;
    toggleLanguage: () => void;
    toggleDarkMode: () => void;
    closeMobileMenu: () => void;
  }
  export interface MobileNavbarProps {
    isArabic: boolean;
    isDarkMode: boolean;
    cartCount: number;
    user: { name: string; isAdmin?: boolean } | null;
    logout: () => void;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
  }
  export interface TabletNavbarProps {
    isArabic: boolean;
    isDarkMode: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    cartCount: number;
    user: { name: string; isAdmin?: boolean } | null;
    toggleLanguage: () => void;
    toggleDarkMode: () => void;
    logout: () => void;
  }
  