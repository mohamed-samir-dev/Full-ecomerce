import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useTheme } from '@/context/ThemeContext';

interface WishlistHeaderProps {
  itemCount: number;
  onBack: () => void;
}

export default function WishlistHeader({ itemCount, onBack }: WishlistHeaderProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onBack}
          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        >
          <ArrowLeftIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
        </button>
        <HeartSolidIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-500" />
        <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          قائمة الأمنيات
        </h1>
        <span className={`px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
          {itemCount}
        </span>
      </div>
    </div>
  );
}
