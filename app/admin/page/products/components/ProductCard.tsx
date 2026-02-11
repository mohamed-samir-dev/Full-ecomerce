import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '../types';
import { getStockBadge } from '../utils/stockBadge';

interface ProductCardProps {
  product: Product;
  isDarkMode: boolean;
  isArabic: boolean;
  onDelete: (id: string) => void;
  deleteLoading: string | null;
}

export const ProductCard = ({ product, isDarkMode, isArabic, onDelete, deleteLoading }: ProductCardProps) => {
  const router = useRouter();

  return (
    <div className={`rounded-lg shadow hover:shadow-lg transition overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`relative h-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <Image 
          src={product.mainImage} 
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.finalPrice < product.basePrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            {Math.round((1 - product.finalPrice / product.basePrice) * 100)}% {isArabic ? 'خصم' : 'OFF'}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className={`font-semibold mb-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isArabic ? product.nameAr : product.name}
        </h3>
        <p className={`text-sm mb-3 line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {isArabic ? product.name : product.nameAr}
        </p>

        <div className="flex gap-2 mb-3">
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">{product.category}</span>
          <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded">{product.brand}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {product.averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500 ml-1">({product.totalReviews})</span>
          </div>
          {getStockBadge(product.stock, isArabic)}
        </div>

        <div className="mb-4">
          {product.finalPrice < product.basePrice ? (
            <div>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {product.finalPrice.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}
              </span>
              <span className={`text-sm line-through ml-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {product.basePrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {product.basePrice.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}
            </span>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {isArabic ? 'المخزون: ' : 'Stock: '}{product.stock}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/page/products/${product._id}`)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
          >
            {isArabic ? 'تعديل' : 'Edit'}
          </button>
          <button
            onClick={() => onDelete(product._id)}
            disabled={deleteLoading === product._id}
            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-medium disabled:bg-gray-400"
          >
            {deleteLoading === product._id ? '...' : isArabic ? 'حذف' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
