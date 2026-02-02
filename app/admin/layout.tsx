'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="p-4">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">📊</span>
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/add-product" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">📦</span>
              <span>Add Product</span>
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">🛍️</span>
              <span>Products</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">📋</span>
              <span>Orders</span>
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">👥</span>
              <span>Users</span>
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">📂</span>
              <span>Categories</span>
            </Link>
            <Link href="/admin/brands" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">🏷️</span>
              <span>Brands</span>
            </Link>
            <Link href="/admin/promo-codes" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">🎟️</span>
              <span>Promo Codes</span>
            </Link>
            <Link href="/admin/contacts" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">✉️</span>
              <span>Contacts</span>
            </Link>
            <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-2">
              <span className="text-xl">⭐</span>
              <span>Reviews</span>
            </Link>
          </nav>
        </aside>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
