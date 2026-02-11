interface ProductsFiltersProps {
  isDarkMode: boolean;
  isArabic: boolean;
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  setPage: (value: number) => void;
}

export const ProductsFilters = ({
  isDarkMode,
  isArabic,
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  setPage
}: ProductsFiltersProps) => {
  return (
    <div className={`rounded-lg shadow p-5 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder={isArabic ? 'ابحث عن منتج...' : 'Search products...'}
          className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'text-gray-900'}`}
        />
        <input
          type="text"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          placeholder={isArabic ? 'فلتر حسب الفئة...' : 'Filter by category...'}
          className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'text-gray-900'}`}
        />
        <input
          type="text"
          value={brand}
          onChange={(e) => { setBrand(e.target.value); setPage(1); }}
          placeholder={isArabic ? 'فلتر حسب العلامة...' : 'Filter by brand...'}
          className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'text-gray-900'}`}
        />
      </div>
    </div>
  );
};
