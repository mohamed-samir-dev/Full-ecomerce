'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();

  useEffect(() => {
    console.log('Admin layout checking auth...');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    console.log('Token exists:', !!token);
    console.log('User data exists:', !!userStr);
    console.log('User data raw:', userStr);
    
    if (!token || !userStr) {
      console.log('No auth data, redirecting to login');
      router.replace('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      console.log('Parsed user:', user);
      console.log('User role:', user.role);
      if (user.role !== 'admin') {
        console.log('Not admin, redirecting to login');
        router.replace('/login');
        return;
      }
      console.log('Admin verified, showing page');
      queueMicrotask(() => setIsAuthorized(true));
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.replace('/login');
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'} mx-auto`}></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`lg:hidden fixed top-20 ${isArabic ? 'left-4' : 'right-4'} z-50 p-3 rounded-lg shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700' 
            : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        {isSidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static top-0 bottom-0 ${isArabic ? 'right-0' : 'left-0'}
          w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg
          transform transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0' : isArabic ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}>
          <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{isArabic ? 'لوحة الإدارة' : 'Admin Panel'}</h1>
          </div>
          <nav className="p-4">
            <Link href="/admin" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">📊</span>
              <span>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
            </Link>
            <Link href="/admin/add-product" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">📦</span>
              <span>{isArabic ? 'إضافة منتج' : 'Add Product'}</span>
            </Link>
            <Link href="/admin/products" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">🛍️</span>
              <span>{isArabic ? 'المنتجات' : 'Products'}</span>
            </Link>
            <Link href="/admin/orders" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">📋</span>
              <span>{isArabic ? 'الطلبات' : 'Orders'}</span>
            </Link>
            <Link href="/admin/users" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">👥</span>
              <span>{isArabic ? 'المستخدمين' : 'Users'}</span>
            </Link>
            <Link href="/admin/categories" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">📂</span>
              <span>{isArabic ? 'الفئات' : 'Categories'}</span>
            </Link>
            <Link href="/admin/brands" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">🏷️</span>
              <span>{isArabic ? 'العلامات التجارية' : 'Brands'}</span>
            </Link>
            <Link href="/admin/promo-codes" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">🎟️</span>
              <span>{isArabic ? 'أكواد الخصم' : 'Promo Codes'}</span>
            </Link>
            <Link href="/admin/contacts" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">✉️</span>
              <span>{isArabic ? 'الرسائل' : 'Contacts'}</span>
            </Link>
            <Link href="/admin/customer-says" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">💬</span>
              <span>{isArabic ? 'آراء العملاء' : 'Customer Says'}</span>
            </Link>
            <Link href="/admin/reviews" onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg mb-2`}>
              <span className="text-xl">⭐</span>
              <span>{isArabic ? 'التقييمات' : 'Reviews'}</span>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 w-full lg:w-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
