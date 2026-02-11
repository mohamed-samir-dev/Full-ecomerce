'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from './hooks/useProducts';
import { useProductDelete } from './hooks/useProductDelete';
import { ProductsHeader } from './components/ProductsHeader';
import { ProductsFilters } from './components/ProductsFilters';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { ProductCard } from './components/ProductCard';
import { Pagination } from './components/Pagination';

export default function ProductsPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const {
    products,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    brand,
    setBrand,
    page,
    setPage,
    totalPages,
    fetchProducts
  } = useProducts();

  const { handleDelete, deleteLoading } = useProductDelete(fetchProducts, isArabic);

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gralineardient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <ProductsHeader isDarkMode={isDarkMode} isArabic={isArabic} />
        
        <ProductsFilters
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          setPage={setPage}
        />

        {loading ? (
          <LoadingSpinner isDarkMode={isDarkMode} />
        ) : products.length === 0 ? (
          <EmptyState isDarkMode={isDarkMode} isArabic={isArabic} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isDarkMode={isDarkMode}
                  isArabic={isArabic}
                  onDelete={handleDelete}
                  deleteLoading={deleteLoading}
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              isDarkMode={isDarkMode}
              isArabic={isArabic}
            />
          </>
        )}
      </div>
    </div>
  );
}
