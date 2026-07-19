import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function EmptyWishlist() {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-28">
      {/* Icon container */}
      <div className="relative mb-6">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: isDarkMode ? '#C9A84C15' : '#C9A84C10' }}
        >
          <HeartIcon
            className="h-12 w-12"
            style={{ color: '#C9A84C' }}
          />
        </div>
        <div
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2"
          style={{
            background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)',
            borderColor: isDarkMode ? '#191C21' : '#f9fafb',
          }}
        >
          <ShoppingBagIcon className="h-4 w-4 text-white" />
        </div>
      </div>

      <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        قائمة الأمنيات فارغة
      </h2>
      <p className={`text-sm sm:text-base mb-8 text-center max-w-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        لم تضف أي منتجات بعد. ابدأ بتصفح متجرنا واحفظ ما يعجبك!
      </p>

      <Link
        href="/pages/shop"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
        style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
      >
        <ShoppingBagIcon className="h-4 w-4" />
        تصفح المنتجات
      </Link>
    </div>
  );
}
