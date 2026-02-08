'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { useRouter } from 'next/navigation';
import { Order } from './types/types';
import orderService from '@/services/orderService';
import LoadingSkeleton from './components/ui/LoadingSkeleton';
import PageHeader from './components/layout/PageHeader';
import StatsGrid from './components/ui/StatsGrid';
import StatusFilter from './components/ui/StatusFilter';
import ErrorMessage from './components/ui/ErrorMessage';
import EmptyState from './components/ui/EmptyState';
import OrdersList from './components/order/OrdersList';
import { calculateOrderStats } from './utils/statsHelpers';

export default function OrdersPage() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      router.push('/pages/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getUserOrders();
        if (response.success && response.data) {
          const ordersData = (Array.isArray(response.data) ? response.data : [response.data]) as Order[];
          setOrders(ordersData);
          setFilteredOrders(ordersData);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, router]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase()));
    }
  }, [statusFilter, orders]);

  const stats = calculateOrderStats(orders);

  if (loading) {
    return <LoadingSkeleton isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1a1d24]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <PageHeader isDarkMode={isDarkMode} isArabic={isArabic} />
        <StatsGrid stats={stats} isDarkMode={isDarkMode} isArabic={isArabic} />
        <StatusFilter value={statusFilter} onChange={setStatusFilter} isDarkMode={isDarkMode} isArabic={isArabic} />
        {error && <ErrorMessage message={error} isDarkMode={isDarkMode} />}
        {filteredOrders.length === 0 ? (
          <EmptyState statusFilter={statusFilter} isDarkMode={isDarkMode} isArabic={isArabic} />
        ) : (
          <OrdersList orders={filteredOrders} isDarkMode={isDarkMode} isArabic={isArabic} />
        )}
      </div>
    </div>
  );
}
