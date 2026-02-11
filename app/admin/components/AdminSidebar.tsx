'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function AdminSidebar() {
  const { isArabic } = useLanguage();

  const links = [
    { title: isArabic ? 'لوحة التحكم' : 'Dashboard', href: '/admin', icon: '📊' },
    { title: isArabic ? 'إضافة منتج' : 'Add Product', href: '/admin/add-product', icon: '📦' },
    { title: isArabic ? 'المنتجات' : 'Products', href: '/admin/products', icon: '🛍️' },
    { title: isArabic ? 'الطلبات' : 'Orders', href: '/admin/orders', icon: '📋' },
    { title: isArabic ? 'المستخدمين' : 'Users', href: '/admin/users', icon: '👥' },
    { title: isArabic ? 'الفئات' : 'Categories', href: '/admin/categories', icon: '📂' },
    { title: isArabic ? 'العلامات التجارية' : 'Brands', href: '/admin/brands', icon: '🏷️' },
    { title: isArabic ? 'أكواد الخصم' : 'Promo Codes', href: '/admin/promo-codes', icon: '🎟️' },
    { title: isArabic ? 'الرسائل' : 'Contacts', href: '/admin/contacts', icon: '✉️' },
    { title: isArabic ? 'آراء العملاء' : 'Customer Says', href: '/admin/customer-says', icon: '💬' },
    { title: isArabic ? 'التقييمات' : 'Reviews', href: '/admin/reviews', icon: '⭐' }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">{isArabic ? 'لوحة الإدارة' : 'Admin Panel'}</h1>
      </div>
      <nav className="p-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
            <span className="text-xl">{link.icon}</span>
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
