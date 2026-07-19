import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

interface WishlistHeaderProps {
  itemCount: number;
  onBack: () => void;
}

export default function WishlistHeader({ itemCount, onBack }: WishlistHeaderProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className="mb-8 sm:mb-10">
      <button
        onClick={onBack}
        className={`flex items-center gap-2 mb-6 text-sm font-medium transition-colors group ${
          isDarkMode ? 'text-gray-400 hover:text-[#C9A84C]' : 'text-gray-500 hover:text-[#C9A84C]'
        }`}
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        العودة
      </button>

      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
            >
              <HeartIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              قائمة الأمنيات
            </h1>
          </div>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            المنتجات التي أضفتها إلى مفضلتك
          </p>
        </div>

        {itemCount > 0 && (
          <div
            className="px-4 py-2 rounded-full text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
          >
            {itemCount} {itemCount === 1 ? 'منتج' : 'منتجات'}
          </div>
        )}
      </div>

      <div
        className="mt-6 h-px w-full"
        style={{ background: `linear-gradient(to right, #C9A84C40, transparent)` }}
      />
    </div>
  );
}
