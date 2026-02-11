'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useOrders } from './hooks/useOrders';
import { Order } from './types';
import {
  OrderStatsCards,
  SearchFilterBar,
  OrdersList,
  OrderDetailsModal,
  OrdersStyles
} from './components';

export default function OrdersPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { orders, loading, stats, updateStatus } = useOrders(statusFilter);

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    const success = await updateStatus(orderId, newStatus);
    if (success && selectedOrder?._id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus as Order['status'] });
    }
  };

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>
            {isArabic ? 'إدارة الطلبات' : 'Orders Management'}
          </h1>
          <p className={`mt-1 sm:mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isArabic ? 'تتبع وإدارة جميع طلبات العملاء' : 'Track and manage all customer orders'}
          </p>
        </div>

        <OrderStatsCards stats={stats} isDarkMode={isDarkMode} isArabic={isArabic} />

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
        />

        <OrdersList
          orders={filteredOrders}
          loading={loading}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          onViewDetails={setSelectedOrder}
        />
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      <OrdersStyles />
    </div>
  );
}
