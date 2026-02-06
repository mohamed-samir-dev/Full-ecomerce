import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/app/types/category';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  accentColor: string;
}

export default function ProductCard({ product, onAddToCart, accentColor }: ProductCardProps) {
  const router = useRouter();
  const { isArabic } = useTranslation();
  const hoverColor = accentColor === '#C11069' ? '#6D093B' : accentColor === '#1E3A8A' ? '#1E40AF' : '#262425';

  const handleCardClick = () => {
    router.push(`/pages/product/${product._id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-48 sm:h-56 lg:h-64">
        <Image src={product.mainImage} alt={isArabic ? product.nameAr : product.name} fill className="object-cover" />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 truncate">{isArabic ? product.nameAr : product.name}</h3>
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <span className="text-base sm:text-lg font-bold" style={{ color: accentColor }}>{product.finalPrice} {isArabic ? 'جنيه' : 'EGP'}</span>
          {product.basePrice > product.finalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">{product.basePrice} {isArabic ? 'جنيه' : 'EGP'}</span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || product.availability === 'out_of_stock'}
          className={`w-full py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1 sm:gap-1.5 ${
            product.stock === 0 || product.availability === 'out_of_stock'
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "text-white cursor-pointer"
          }`}
          style={product.stock > 0 && product.availability !== 'out_of_stock' ? { backgroundColor: accentColor } : {}}
          onMouseEnter={(e) => product.stock > 0 && product.availability !== 'out_of_stock' && (e.currentTarget.style.backgroundColor = hoverColor)}
          onMouseLeave={(e) => product.stock > 0 && product.availability !== 'out_of_stock' && (e.currentTarget.style.backgroundColor = accentColor)}
        >
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {product.stock === 0 || product.availability === 'out_of_stock' ? (isArabic ? "غير متوفر" : "Out of Stock") : (isArabic ? "أضف للسلة" : "Add to Cart")}
        </button>
      </div>
    </div>
  );
}
