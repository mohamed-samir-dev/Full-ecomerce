'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface Product {
  _id: string;
  name: string;
  nameAr: string;
  mainImage: string;
  basePrice: number;
  finalPrice: number;
  stock: number;
  category: string;
  brand: string;
  averageRating: number;
  totalReviews: number;
  availability: string;
  createdAt: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9'
      });
      
      if (search.trim()) params.append('search', search.trim());
      if (category.trim()) params.append('category', category.trim());
      if (brand.trim()) params.append('brand', brand.trim());

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${params}`);
      const data = await res.json();
      
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search, category, brand]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search, category, brand, fetchProducts]);

  const handleDelete = async (id: string) => {
    if (!confirm(isArabic ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) return;
    
    setDeleteLoading(id);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        fetchProducts();
      } else {
        alert(isArabic ? 'فشل حذف المنتج' : 'Failed to delete product');
      }
    } catch  {
      alert(isArabic ? 'فشل حذف المنتج' : 'Failed to delete product');
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">{isArabic ? 'نفذ من المخزون' : 'Out of Stock'}</span>;
    if (stock < 10) return <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-700">{isArabic ? 'مخزون منخفض' : 'Low Stock'}</span>;
    return <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">{isArabic ? 'متوفر' : 'In Stock'}</span>;
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'المنتجات' : 'Products'}</h1>
            <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'إدارة المنتجات' : 'Manage your products'}</p>
          </div>
          <Link 
            href="/admin/add-product"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {isArabic ? '+ إضافة منتج' : '+ Add Product'}
          </Link>
        </div>

        {/* Filters */}
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

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
          </div>
        ) : products.length === 0 ? (
          <div className={`rounded-lg shadow p-12 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'لا توجد منتجات' : 'No products found'}</p>
            <Link 
              href="/admin/add-product"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {isArabic ? '+ إضافة منتج' : '+ Add Product'}
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div key={product._id} className={`rounded-lg shadow hover:shadow-lg transition overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  {/* Image */}
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

                  {/* Info */}
                  <div className="p-4">
                    <h3 className={`font-semibold mb-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? product.nameAr : product.name}</h3>
                    <p className={`text-sm mb-3 line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? product.name : product.nameAr}</p>

                    <div className="flex gap-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">{product.category}</span>
                      <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded">{product.brand}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{product.averageRating.toFixed(1)}</span>
                        <span className="text-xs text-gray-500 ml-1">({product.totalReviews})</span>
                      </div>
                      {getStockBadge(product.stock)}
                    </div>

                    <div className="mb-4">
                      {product.finalPrice < product.basePrice ? (
                        <div>
                          <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.finalPrice.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}</span>
                          <span className={`text-sm line-through ml-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{product.basePrice.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.basePrice.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}</span>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{isArabic ? 'المخزون: ' : 'Stock: '}{product.stock}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/admin/products/${product._id}`)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
                      >
                        {isArabic ? 'تعديل' : 'Edit'}
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deleteLoading === product._id}
                        className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-medium disabled:bg-gray-400"
                      >
                        {deleteLoading === product._id ? '...' : isArabic ? 'حذف' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 border-2 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-800 text-gray-900 hover:bg-gray-800 hover:text-white'}`}
                >
                  {isArabic ? 'السابق' : 'Previous'}
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          page === pageNum
                            ? isDarkMode ? 'bg-blue-600 text-white border-2 border-blue-600' : 'bg-gray-900 text-white border-2 border-gray-900'
                            : isDarkMode ? 'bg-gray-800 border-2 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-2 border-gray-800 text-gray-900 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`px-4 py-2 border-2 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-800 text-gray-900 hover:bg-gray-800 hover:text-white'}`}
                >
                  {isArabic ? 'التالي' : 'Next'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
