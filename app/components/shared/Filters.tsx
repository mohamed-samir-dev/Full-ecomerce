import { SlidersHorizontal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface FiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
  productsCount: number;
  isArabic: boolean;
}

export default function Filters({
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  categories,
  productsCount,
  isArabic
}: FiltersProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2">
        <SlidersHorizontal className={`w-5 h-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`} />
        <span className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {isArabic ? 'الفئة:' : 'Category:'}
        </span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39E7A] text-sm font-medium ${
            isDarkMode ? 'bg-[#23272F] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="all">{isArabic ? 'الكل' : 'All'}</option>
          {categories.filter(c => c !== 'all').map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {productsCount} {isArabic ? 'منتج' : 'Products'}
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B39E7A] text-sm font-medium ${
            isDarkMode ? 'bg-[#23272F] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="newest">{isArabic ? 'الأحدث' : 'Newest'}</option>
          <option value="price-low">{isArabic ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
          <option value="price-high">{isArabic ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
          <option value="name">{isArabic ? 'الاسم' : 'Name'}</option>
        </select>
      </div>
    </div>
  );
}
