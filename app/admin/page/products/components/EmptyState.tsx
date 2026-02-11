import Link from 'next/link';

interface EmptyStateProps {
  isDarkMode: boolean;
  isArabic: boolean;
}

export const EmptyState = ({ isDarkMode, isArabic }: EmptyStateProps) => {
  return (
    <div className={`rounded-lg shadow p-12 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {isArabic ? 'لا توجد منتجات' : 'No products found'}
      </p>
      <Link 
        href="/admin/page/add-product"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
      >
        {isArabic ? '+ إضافة منتج' : '+ Add Product'}
      </Link>
    </div>
  );
};
