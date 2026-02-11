'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface Order {
  _id: string;
  userId: { _id: string; name: string; email: string };
  products: Array<{
    productId: { _id: string; name: string; mainImage?: string };
    name: string;
    quantity: number;
    price: number;
    selectedOptions?: { size?: string; color?: string };
  }>;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const params = new URLSearchParams({ limit: '100', ...(statusFilter && { status: statusFilter }) });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus as Order['status'] });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusStyle = (status: string) => {
    const styles = {
      pending: 'bg-gradient-to-r from-amber-400 to-orange-500',
      confirmed: 'bg-gradient-to-r from-blue-400 to-blue-600',
      shipped: 'bg-gradient-to-r from-purple-400 to-purple-600',
      delivered: 'bg-gradient-to-r from-green-400 to-green-600',
      cancelled: 'bg-gradient-to-r from-red-400 to-red-600'
    };
    return styles[status as keyof typeof styles];
  };

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalPrice, 0)
  };

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>{isArabic ? 'إدارة الطلبات' : 'Orders Management'}</h1>
          <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'تتبع وإدارة جميع طلبات العملاء' : 'Track and manage all customer orders'}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>{stats.total}</div>
            <div className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'إجمالي الطلبات' : 'Total Orders'}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.pending}</div>
            <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'قيد الانتظار' : 'Pending'}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.confirmed}</div>
            <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'مؤكدة' : 'Confirmed'}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.shipped}</div>
            <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'قيد الشحن' : 'Shipped'}</div>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.delivered}</div>
            <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'تم التوصيل' : 'Delivered'}</div>
          </div>
          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.cancelled}</div>
            <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'ملغاة' : 'Cancelled'}</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.revenue.toFixed(0)}</div>
            <div className="text-[10px] sm:text-xs text-white/90 mt-1 sm:mt-2 font-medium">{isArabic ? 'الإيرادات (جنيه)' : 'Revenue (EGP)'}</div>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg border p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700'}`}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isArabic ? 'بحث في الطلبات...' : 'Search orders...'}
                className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500' : 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-gray-600'}`}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' : 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600'}`}
            >
              <option value="">{isArabic ? 'جميع الحالات' : 'All Status'}</option>
              <option value="pending">{isArabic ? 'قيد الانتظار' : 'Pending'}</option>
              <option value="confirmed">{isArabic ? 'مؤكدة' : 'Confirmed'}</option>
              <option value="shipped">{isArabic ? 'قيد الشحن' : 'Shipped'}</option>
              <option value="delivered">{isArabic ? 'تم التوصيل' : 'Delivered'}</option>
              <option value="cancelled">{isArabic ? 'ملغاة' : 'Cancelled'}</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <div className={`animate-spin rounded-full h-16 w-16 border-4 ${isDarkMode ? 'border-gray-700' : 'border-blue-200'}`}></div>
              <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent absolute top-0 left-0 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 max-h-[600px] overflow-y-auto pr-1 sm:pr-2 orders-scrollbar">
            {filteredOrders.map((order) => (
              <div key={order._id} className={`backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-5 md:p-6 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-white/50'}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${getStatusStyle(order.status)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-base sm:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>#{order._id.slice(-8).toUpperCase()}</div>
                      <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(order.createdAt).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6">
                    <div className="text-center">
                      <div className={`text-[10px] sm:text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'العميل' : 'Customer'}</div>
                      <div className={`font-semibold text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>{order.userId?.name || 'N/A'}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-[10px] sm:text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'العناصر' : 'Items'}</div>
                      <div className={`font-semibold text-xs sm:text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.products.length}</div>
                    </div>
                    <div className="text-center col-span-2 sm:col-span-1">
                      <div className={`text-[10px] sm:text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'الإجمالي' : 'Total'}</div>
                      <div className="font-bold text-emerald-600 text-sm sm:text-base md:text-lg">{order.totalPrice.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                      <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white ${getStatusStyle(order.status)} shadow-md text-center`}>
                        {isArabic ? (order.status === 'pending' ? 'قيد الانتظار' : order.status === 'confirmed' ? 'مؤكدة' : order.status === 'shipped' ? 'قيد الشحن' : order.status === 'delivered' ? 'تم التوصيل' : 'ملغاة') : order.status}
                      </span>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                      >
                        {isArabic ? 'عرض التفاصيل' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={() => setSelectedOrder(null)}>
          <div className={`rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-slideUp ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-3">{isArabic ? 'تفاصيل الطلب' : 'Order Details'}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">#{selectedOrder._id.slice(-8).toUpperCase()}</span>
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusStyle(selectedOrder.status)} shadow-lg`}>
                      {isArabic ? (selectedOrder.status === 'pending' ? 'قيد الانتظار' : selectedOrder.status === 'confirmed' ? 'مؤكدة' : selectedOrder.status === 'shipped' ? 'قيد الشحن' : selectedOrder.status === 'delivered' ? 'تم التوصيل' : 'ملغاة') : selectedOrder.status}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="hover:bg-white/20 rounded-xl p-3 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className={`overflow-y-auto max-h-[calc(90vh-180px)] p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className={`rounded-xl p-6 shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-100'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'العميل' : 'Customer'}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'الاسم:' : 'Name:'}</span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedOrder.userId?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'البريد:' : 'Email:'}</span>
                      <span className={`font-semibold text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedOrder.userId?.email || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className={`rounded-xl p-6 shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    </div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'عنوان الشحن' : 'Shipping Address'}</h3>
                  </div>
                  <div className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p className="font-semibold">{selectedOrder.shippingAddress.fullName}</p>
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                    <p className="font-semibold mt-2">{selectedOrder.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>

              <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'المنتجات' : 'Products'} ({selectedOrder.products.length})</h3>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedOrder.products.map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-gray-50 to-purple-50'}`}>
                      {item.productId?.mainImage && (
                        <Image src={item.productId.mainImage} alt={item.name} width={70} height={70} className="w-[70px] h-[70px] object-cover rounded-lg shadow-md" />
                      )}
                      <div className="flex-1">
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{isArabic ? 'الكمية' : 'Qty'}: {item.quantity} × {item.price.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}</p>
                        {item.selectedOptions && (
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.selectedOptions.size && `${isArabic ? 'المقاس' : 'Size'}: ${item.selectedOptions.size}`}
                            {item.selectedOptions.color && ` • ${isArabic ? 'اللون' : 'Color'}: ${item.selectedOptions.color}`}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{(item.quantity * item.price).toFixed(2)}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isArabic ? 'جنيه' : 'EGP'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-xl p-6 shadow-lg border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'معلومات الدفع' : 'Payment Info'}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'الطريقة:' : 'Method:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{isArabic ? 'التاريخ:' : 'Date:'}</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(selectedOrder.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</span>
                  </div>
                </div>
                {selectedOrder.notes && (
                  <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-amber-100'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-semibold">{isArabic ? 'ملاحظات:' : 'Notes:'}</span> {selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">{isArabic ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
                  <span className="text-4xl font-bold">{selectedOrder.totalPrice.toFixed(2)} {isArabic ? 'جنيه' : 'EGP'}</span>
                </div>
              </div>

              <div className={`rounded-xl p-6 shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{isArabic ? 'تحديث الحالة' : 'Update Status'}</h3>
                <div className="flex flex-wrap gap-3">
                  {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedOrder._id, status)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedOrder.status === status
                          ? `${getStatusStyle(status)} text-white shadow-lg scale-105`
                          : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isArabic ? (status === 'pending' ? 'قيد الانتظار' : status === 'confirmed' ? 'مؤكدة' : status === 'shipped' ? 'قيد الشحن' : status === 'delivered' ? 'تم التوصيل' : 'ملغاة') : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }
        .orders-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .orders-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        .orders-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #2563eb);
          border-radius: 10px;
        }
        .orders-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #1d4ed8);
        }
      `}</style>
    </div>
  );
}
