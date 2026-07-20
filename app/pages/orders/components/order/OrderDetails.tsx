import ProductList from './ProductList';
import PriceSummary from './PriceSummary';
import ShippingInfo from '../layout/ShippingInfo';
import PaymentInfo from '../layout/PaymentInfo';
import { OrderDetailsProps } from '../../types/types';

export default function OrderDetails({ order, subtotal, isDarkMode, isArabic }: OrderDetailsProps) {
  return (
    <div className={`border-t p-5 sm:p-6 space-y-4 ${
      isDarkMode ? 'border-white/5 bg-[#191C21]' : 'border-black/5 bg-gray-50'
    }`}>
      <ProductList products={order.products} isDarkMode={isDarkMode} isArabic={isArabic} />
      <PriceSummary subtotal={subtotal} totalPrice={order.totalPrice} isDarkMode={isDarkMode} isArabic={isArabic} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShippingInfo shippingAddress={order.shippingAddress} isDarkMode={isDarkMode} isArabic={isArabic} />
        <PaymentInfo paymentMethod={order.paymentMethod} isDarkMode={isDarkMode} isArabic={isArabic} />
      </div>
      {order.notes && (
        <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#1F2329] border-white/5' : 'bg-white border-black/5'}`}>
          <p className={`text-xs font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'ملاحظات' : 'Notes'}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${isArabic ? 'text-right' : ''}`}>
            {order.notes}
          </p>
        </div>
      )}
    </div>
  );
}
