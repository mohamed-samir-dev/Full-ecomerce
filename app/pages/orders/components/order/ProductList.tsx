import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import ProductItem from './ProductItem';
import {ProductListProps}from '../../types/types'


export default function ProductList({ products, isDarkMode, isArabic }: ProductListProps) {
  return (
    <div>
      <div className={`flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <ShoppingBagIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h4 className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {isArabic ? 'تفاصيل المنتجات' : 'Product Details'}
        </h4>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {products.map((item, idx) => (
          <ProductItem key={idx} item={item} isDarkMode={isDarkMode} isArabic={isArabic} />
        ))}
      </div>
    </div>
  );
}
