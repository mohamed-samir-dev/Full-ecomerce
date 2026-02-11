'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users, Clock, CheckCircle, AlertTriangle, Mail, Activity, ArrowUpRight, Plus, Eye, Settings, Tag } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface Order {
  _id: string;
  userId?: { name: string };
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0, pendingOrders: 0, contacts: 0, lowStock: 0, completedOrders: 0, avgOrderValue: 0 });
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
            lowStock: data.lowStock,
            completedOrders: data.completedOrders || 0,
            avgOrderValue: data.avgOrderValue || 0
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

  const mainStats = [
    { title: isArabic ? 'إجمالي الإيرادات' : 'Total Revenue', value: stats.revenue, prefix: isArabic ? 'جنيه' : 'EGP', icon: DollarSign, color: 'from-emerald-500 to-teal-600', trend: '+12.5%', up: true },
    { title: isArabic ? 'إجمالي الطلبات' : 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'from-blue-500 to-indigo-600', trend: '+8.2%', up: true },
    { title: isArabic ? 'المنتجات' : 'Products', value: stats.products, icon: Package, color: 'from-violet-500 to-purple-600', trend: '+3.1%', up: true },
    { title: isArabic ? 'العملاء' : 'Customers', value: stats.users, icon: Users, color: 'from-orange-500 to-red-600', trend: '+15.3%', up: true }
  ];

  const quickStats = [
    { label: isArabic ? 'قيد الانتظار' : 'Pending', value: stats.pendingOrders, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: isArabic ? 'مكتملة' : 'Completed', value: stats.completedOrders, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: isArabic ? 'مخزون منخفض' : 'Low Stock', value: stats.lowStock, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    { label: isArabic ? 'الرسائل' : 'Messages', value: stats.contacts, icon: Mail, color: 'text-blue-600 bg-blue-50' }
  ];

  return (
    <main className={`flex-1 p-4 sm:p-6 lg:p-8 min-h-screen ${isDarkMode ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-linear-to-br from-gray-50 via-slate-50 to-gray-100'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'لوحة التحكم' : 'Dashboard'}</h1>
            <p className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Activity className="w-4 h-4" />
              {isArabic ? 'التحليلات والرؤى في الوقت الفعلي' : 'Real-time analytics and insights'}
            </p>
          </div>
          <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {new Date().toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="relative">
              <div className={`w-20 h-20 border-4 rounded-full animate-spin ${isDarkMode ? 'border-gray-700 border-t-blue-400' : 'border-gray-200 border-t-blue-600'}`}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainStats.map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color}`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {stat.trend}
                      </div>
                    </div>
                    <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</h3>
                    <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stat.prefix && <span className="text-xl">{stat.prefix} </span>}
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {quickStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className={`lg:col-span-2 rounded-2xl shadow-sm p-4 sm:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'الطلبات الأخيرة' : 'Recent Orders'}</h3>
                  <Link href="/admin/orders" className={`flex items-center gap-1 text-sm font-semibold ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                    {isArabic ? 'عرض الكل' : 'View All'} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.05 }}
                    >
                      <Link href="/admin/orders" className={`flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all group ${isDarkMode ? 'bg-gray-700 hover:bg-linear-to-r hover:from-blue-900 hover:to-indigo-900' : 'bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'}`}>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                            #{order._id.slice(-2)}
                          </div>
                          <div>
                            <p className={`font-bold text-sm sm:text-base transition ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>#{order._id.slice(-6)}</p>
                            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{order.userId?.name || 'Guest'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-base sm:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.totalPrice.toLocaleString()} <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'جنيه' : 'EGP'}</span></p>
                          <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>{isArabic ? (order.status === 'pending' ? 'قيد الانتظار' : order.status === 'delivered' ? 'تم التوصيل' : order.status) : order.status}</span>
                        </div>
                      </Link>
                    </motion.div>
                  )) : (
                    <div className="text-center py-16">
                      <ShoppingCart className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                      <p className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'لا توجد طلبات حديثة' : 'No recent orders'}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-6"
              >
                <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'إجراءات سريعة' : 'Quick Actions'}</h3>
                  <div className="space-y-3">
                    {[
                      { label: isArabic ? 'إضافة منتج' : 'Add Product', href: '/admin/add-product', icon: Plus, color: 'from-blue-500 to-blue-600' },
                      { label: isArabic ? 'عرض الطلبات' : 'View Orders', href: '/admin/orders', icon: Eye, color: 'from-green-500 to-green-600' },
                      { label: isArabic ? 'إدارة المستخدمين' : 'Manage Users', href: '/admin/users', icon: Settings, color: 'from-purple-500 to-purple-600' },
                      { label: isArabic ? 'أكواد الخصم' : 'Promo Codes', href: '/admin/promo-codes', icon: Tag, color: 'from-orange-500 to-orange-600' }
                    ].map((action) => (
                      <Link key={action.href} href={action.href} className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all group`}>
                        <action.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-sm sm:text-base">{action.label}</span>
                        <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h4 className="text-base sm:text-lg font-bold">{isArabic ? 'متوسط قيمة الطلب' : 'Avg Order Value'}</h4>
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold mb-2">{stats.avgOrderValue.toLocaleString()}</p>
                  <p className="text-xs sm:text-sm opacity-90">{isArabic ? 'جنيه لكل طلب' : 'EGP per order'}</p>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                    <p className="text-xs sm:text-sm">{isArabic ? 'معدل الإكمال: ' : 'Completion Rate: '}<span className="font-bold">{stats.orders > 0 ? ((stats.completedOrders / stats.orders) * 100).toFixed(1) : 0}%</span></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
