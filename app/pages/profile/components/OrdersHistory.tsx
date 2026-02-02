import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { OrdersHistoryProps } from '../types/types';
import { useOrders } from '../hooks/useOrders';
import { getStatusIcon, getStatusColor } from '../utils/orderStatus';

export default function OrdersHistory({ isDarkMode, isArabic }: OrdersHistoryProps) {
  const { orders, loading } = useOrders();

  return (
    <div className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-6 shadow-xl ${
      isDarkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      <div className={`flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <ClipboardDocumentListIcon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
        </div>
        <h2 className={`text-base sm:text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {isArabic ? 'سجل الطلبات' : 'Orders History'}
        </h2>
      </div>

      {loading ? (
        <div className="space-y-3 sm:space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`h-20 sm:h-24 rounded-lg sm:rounded-xl animate-pulse ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className={`text-center py-8 sm:py-10 md:py-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <ClipboardDocumentListIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
          <p className="text-base sm:text-lg font-medium">
            {isArabic ? 'لا توجد طلبات بعد' : 'No orders yet'}
          </p>
          <Link 
            href="/pages/shop"
            className="inline-block mt-3 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
          >
            {isArabic ? 'تسوق الآن' : 'Start Shopping'}
          </Link>
        </div>
      ) : (
        <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode ? 'bg-slate-700/50 border-slate-600 hover:border-slate-500' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`flex items-center justify-between mb-2 sm:mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 sm:gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  {getStatusIcon(order.status)}
                  <div className={isArabic ? 'text-right' : ''}>
                    <p className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {isArabic ? 'طلب رقم' : 'Order'} #{order._id.slice(-8)}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {order.products.length} {order.products.length === 1 ? (isArabic ? 'منتج' : 'item') : (isArabic ? 'منتجات' : 'items')}
                </p>
                <p className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
