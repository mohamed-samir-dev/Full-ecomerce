import { Order } from '../types';
import OrderCard from './OrderCard';

interface OrdersListProps {
  orders: Order[];
  loading: boolean;
  isDarkMode: boolean;
  isArabic: boolean;
  onViewDetails: (order: Order) => void;
}

export default function OrdersList({ orders, loading, isDarkMode, isArabic, onViewDetails }: OrdersListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className={`animate-spin rounded-full h-16 w-16 border-4 ${isDarkMode ? 'border-gray-700' : 'border-blue-200'}`}></div>
          <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent absolute top-0 left-0 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 max-h-[600px] overflow-y-auto pr-1 sm:pr-2 orders-scrollbar">
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
