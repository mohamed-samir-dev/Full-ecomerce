import Link from 'next/link';

interface ProductsHeaderProps {
  isDarkMode: boolean;
  isArabic: boolean;
}

export const ProductsHeader = ({ isDarkMode, isArabic }: ProductsHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isArabic ? 'المنتجات' : 'Products'}
        </h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {isArabic ? 'إدارة المنتجات' : 'Manage your products'}
        </p>
      </div>
      <Link 
        href="/admin/page/add-product"
        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
      >
        {isArabic ? '+ إضافة منتج' : '+ Add Product'}
      </Link>
    </div>
  );
};
