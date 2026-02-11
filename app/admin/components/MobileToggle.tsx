import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface MobileToggleProps {
  isOpen: boolean;
  isDarkMode: boolean;
  isArabic: boolean;
  onToggle: () => void;
}

export default function MobileToggle({ isOpen, isDarkMode, isArabic, onToggle }: MobileToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`lg:hidden fixed top-20 ${isArabic ? 'left-4' : 'right-4'} z-50 p-3 rounded-lg shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
    </button>
  );
}
