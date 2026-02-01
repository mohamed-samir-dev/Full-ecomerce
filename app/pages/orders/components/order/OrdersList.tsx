import OrderCard from './OrderCard';
import { OrdersListProps } from '../../types/types';



export default function OrdersList({ orders, isDarkMode, isArabic }: OrdersListProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} isDarkMode={isDarkMode} isArabic={isArabic} />
      ))}
    </div>
  );
}
