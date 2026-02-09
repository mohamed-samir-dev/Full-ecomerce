import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/context/ThemeContext';

interface Product {
  _id: string;
  name: string;
  nameAr?: string;
  mainImage?: string;
  basePrice: number;
  finalPrice?: number;
}

interface WishlistItemProps {
  product: Product;
  onRemove: (productId: string) => void;
  onViewDetails: (productId: string) => void;
}

export default function WishlistItem({ product, onRemove, onViewDetails }: WishlistItemProps) {
  const { isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`rounded-lg overflow-hidden transition-all hover:shadow-xl shadow-md ${isDarkMode ? 'bg-[#1F2329]' : 'bg-white'}`}>
      <div className="relative h-48 sm:h-56 md:h-64">
        <Image
          src={product.mainImage || '/images/placeholder.jpg'}
          alt={isArabic ? product.nameAr || product.name : product.name}
          fill
          className="object-cover"
        />
        <button
          onClick={() => onRemove(product._id)}
          aria-label={isArabic ? 'حذف من المفضلة' : 'Remove from Wishlist'}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <Link href={`/pages/product/${product._id}`}>
          <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-2 hover:text-blue-600 transition-colors line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {isArabic ? product.nameAr || product.name : product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {product.finalPrice?.toFixed(2) || product.basePrice?.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}
          </span>
          {product.finalPrice !== undefined && product.finalPrice < product.basePrice && (
            <span className="text-xs sm:text-sm line-through text-gray-400">
              {product.basePrice?.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}
            </span>
          )}
        </div>

        <button
          onClick={() => onViewDetails(product._id)}
          aria-label={isArabic ? 'عرض تفاصيل المنتج' : 'View Product Details'}
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}
