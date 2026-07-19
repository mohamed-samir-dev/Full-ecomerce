import { TrashIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
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

  const hasDiscount = product.finalPrice !== undefined && product.finalPrice < product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - product.finalPrice!) / product.basePrice) * 100)
    : 0;
  const displayName = isArabic ? product.nameAr || product.name : product.name;

  return (
    <div
      className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border ${
        isDarkMode
          ? 'bg-[#1F2329] border-white/5 hover:border-[#C9A84C]/30'
          : 'bg-white border-black/5 hover:border-[#C9A84C]/30'
      }`}
    >
      {/* Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <Image
          src={product.mainImage || '/images/placeholder.jpg'}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
          >
            <TagIcon className="h-3 w-3" />
            -{discountPercent}%
          </div>
        )}

        {/* Remove button */}
        <button
          onClick={() => onRemove(product._id)}
          aria-label="حذف من المفضلة"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
        >
          <TrashIcon className="h-4 w-4 text-red-500" />
        </button>

        {/* Heart watermark */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <HeartIcon className="h-5 w-5 text-[#C9A84C]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/pages/product/${product._id}`}>
          <h3
            className={`text-sm sm:text-base font-semibold mb-3 line-clamp-2 transition-colors hover:text-[#C9A84C] ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {displayName}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg sm:text-xl font-bold" style={{ color: '#C9A84C' }}>
            {(product.finalPrice ?? product.basePrice).toFixed(2)}
          </span>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isArabic ? 'جنيه' : 'EGP'}
          </span>
          {hasDiscount && (
            <span className={`text-xs line-through ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {product.basePrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-4"
          style={{ background: `linear-gradient(to right, #C9A84C30, transparent)` }}
        />

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(product._id)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
          style={{ background: 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)' }}
        >
          <EyeIcon className="h-4 w-4" />
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}
