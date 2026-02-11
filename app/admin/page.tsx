'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useDashboardData } from './hooks/useDashboardData';
import { getMainStats, getQuickStats, getQuickActions } from './utils/dashboardData';
import DashboardHeader from './components/DashboardHeader';
import MainStatsGrid from './components/MainStatsGrid';
import QuickStatsGrid from './components/QuickStatsGrid';
import RecentOrders from './components/RecentOrders';
import QuickActions from './components/QuickActions';
import AvgOrderCard from './components/AvgOrderCard';
import LoadingSpinner from './components/LoadingSpinner';

export default function AdminDashboard() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useLanguage();
  const { stats, recentOrders, loading } = useDashboardData();

  const mainStats = getMainStats(stats, isArabic);
  const quickStats = getQuickStats(stats, isArabic);
  const quickActions = getQuickActions(isArabic);

  return (
    <main className={`flex-1 p-4 sm:p-6 lg:p-8 min-h-screen ${isDarkMode ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-linear-to-br from-gray-50 via-slate-50 to-gray-100'}`}>
      <div className="max-w-7xl mx-auto">
        <DashboardHeader isDarkMode={isDarkMode} isArabic={isArabic} />

        {loading ? (
          <LoadingSpinner isDarkMode={isDarkMode} />
        ) : (
          <div className="space-y-6">
            <MainStatsGrid stats={mainStats} isDarkMode={isDarkMode} />
            <QuickStatsGrid stats={quickStats} isDarkMode={isDarkMode} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <RecentOrders orders={recentOrders} isDarkMode={isDarkMode} isArabic={isArabic} />
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-6"
              >
                <QuickActions actions={quickActions} isDarkMode={isDarkMode} isArabic={isArabic} />
                <AvgOrderCard stats={stats} isArabic={isArabic} />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
