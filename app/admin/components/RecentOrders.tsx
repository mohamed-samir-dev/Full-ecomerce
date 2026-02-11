import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShoppingCart } from 'lucide-react';
import { Order } from '../types/dashboard';

interface RecentOrdersProps {
  orders: Order[];
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function RecentOrders({ orders, isDarkMode, isArabic }: RecentOrdersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className={`lg:col-span-2 rounded-2xl shadow-sm p-4 sm:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isArabic ? 'الطلبات الأخيرة' : 'Recent Orders'}
        </h3>
        <Link href="/admin/page/orders" className={`flex items-center gap-1 text-sm font-semibold ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
          {isArabic ? 'عرض الكل' : 'View All'} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="space-y-3">
        {orders.length > 0 ? orders.map((order, i) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.05 }}
          >
            <Link href="/admin/page/orders" className={`flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all group ${isDarkMode ? 'bg-gray-700 hover:bg-linear-to-r hover:from-blue-900 hover:to-indigo-900' : 'bg-gray-50 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50'}`}>
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
                <p className={`font-bold text-base sm:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.totalPrice.toLocaleString()} <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{isArabic ? 'جنيه' : 'EGP'}</span>
                </p>
                <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${
                  order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                  'bg-blue-100 text-blue-700'
                }`}>
                  {isArabic ? (order.status === 'pending' ? 'قيد الانتظار' : order.status === 'delivered' ? 'تم التوصيل' : order.status) : order.status}
                </span>
              </div>
            </Link>
          </motion.div>
        )) : (
          <div className="text-center py-16">
            <ShoppingCart className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isArabic ? 'لا توجد طلبات حديثة' : 'No recent orders'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
