import { useState, useEffect } from 'react';
import { DashboardStats, Order } from '../types/dashboard';

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
    pendingOrders: 0,
    contacts: 0,
    lowStock: 0,
    completedOrders: 0,
    avgOrderValue: 0
  });
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

  return { stats, recentOrders, loading };
};
