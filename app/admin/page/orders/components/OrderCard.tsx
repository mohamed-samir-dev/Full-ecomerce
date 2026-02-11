import { Order } from '../types';
import { getStatusStyle, getStatusLabel } from '../utils/orderHelpers';

interface OrderCardProps {
  order: Order;
  isDarkMode: boolean;
  isArabic: boolean;
  onViewDetails: (order: Order) => void;
}

export default function OrderCard({ order, isDarkMode, isArabic, onViewDetails }: OrderCardProps) {
  return (
    <div className={`backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-5 md:p-6 border hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-white/50'}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${getStatusStyle(order.status)} flex items-center justify-center shadow-lg shrink-0`}>
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
              {getStatusLabel(order.status, isArabic)}
            </span>
            <button
              onClick={() => onViewDetails(order)}
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              {isArabic ? 'عرض التفاصيل' : 'View Details'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
