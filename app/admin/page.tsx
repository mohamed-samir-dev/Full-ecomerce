'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  _id: string;
  userId?: { name: string };
  totalPrice: number;
  status: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0, pendingOrders: 0, contacts: 0, lowStock: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const result = await res.json();
          const data = result.data;
          setStats({
            products: data.products,
            orders: data.orders,
            users: data.users,
            revenue: data.revenue,
            pendingOrders: data.pendingOrders,
            contacts: data.contacts,
            lowStock: data.lowStock
          });
          setRecentOrders(data.recentOrders);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { title: 'Total Revenue', value: `${stats.revenue.toLocaleString()} EGP`, icon: '💰', gradient: 'from-emerald-500 to-teal-600', link: '/admin/orders' },
    { title: 'Total Orders', value: stats.orders, icon: '📦', gradient: 'from-blue-500 to-indigo-600', link: '/admin/orders' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: '⏳', gradient: 'from-orange-500 to-red-600', link: '/admin/orders' },
    { title: 'Total Products', value: stats.products, icon: '🛍️', gradient: 'from-purple-500 to-pink-600', link: '/admin/products' },
    { title: 'Low Stock Items', value: stats.lowStock, icon: '⚠️', gradient: 'from-yellow-500 to-orange-600', link: '/admin/products' },
    { title: 'Total Users', value: stats.users, icon: '👥', gradient: 'from-cyan-500 to-blue-600', link: '/admin/users' },
    { title: 'Contact Messages', value: stats.contacts, icon: '✉️', gradient: 'from-pink-500 to-rose-600', link: '/admin/contacts' }
  ];

  return (
    <main className="flex-1 p-4 md:p-8 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your store performance and manage operations</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card) => (
              <Link key={card.title} href={card.link} className={`bg-linear-to-br ${card.gradient} rounded-2xl shadow-xl p-6 text-white hover:scale-105 transition-transform duration-300 group`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{card.icon}</span>
                  <svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
                <h3 className="text-sm font-medium opacity-90 mb-1">{card.title}</h3>
                <p className="text-3xl font-bold">{card.value}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">📊</span>Recent Orders</h3>
              <div className="space-y-3">
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <Link key={order._id} href={`/admin/orders`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div>
                      <p className="font-semibold text-gray-800">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-600">{order.userId?.name || 'Guest'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{order.totalPrice} EGP</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{order.status}</span>
                    </div>
                  </Link>
                )) : <p className="text-gray-500 text-center py-4">No recent orders</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">⚡</span>Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[{ title: 'Add Product', href: '/admin/add-product', icon: '➕', color: 'blue' }, { title: 'View Orders', href: '/admin/orders', icon: '📋', color: 'green' }, { title: 'Manage Users', href: '/admin/users', icon: '👥', color: 'purple' }, { title: 'Categories', href: '/admin/categories', icon: '📂', color: 'orange' }].map((link) => (
                  <Link key={link.href} href={link.href} className={`flex flex-col items-center justify-center p-6 bg-${link.color}-50 border-2 border-${link.color}-200 rounded-xl hover:border-${link.color}-400 hover:shadow-md transition`}>
                    <span className="text-3xl mb-2">{link.icon}</span>
                    <span className="text-sm font-semibold text-gray-700">{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
