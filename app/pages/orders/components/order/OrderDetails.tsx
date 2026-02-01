import ProductList from './ProductList';
import PriceSummary from './PriceSummary';
import ShippingInfo from '../layout/ShippingInfo';
import PaymentInfo from '../layout/PaymentInfo';
import { OrderDetailsProps } from '../../types/types';



export default function OrderDetails({ order, subtotal, isDarkMode, isArabic }: OrderDetailsProps) {
  return (
    <div className={`border-t-2 p-6 sm:p-8 ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
      <div className="space-y-6">
        <ProductList products={order.products} isDarkMode={isDarkMode} isArabic={isArabic} />
        <PriceSummary subtotal={subtotal} totalPrice={order.totalPrice} isDarkMode={isDarkMode} isArabic={isArabic} />
        <ShippingInfo shippingAddress={order.shippingAddress} isDarkMode={isDarkMode} isArabic={isArabic} />
        <PaymentInfo paymentMethod={order.paymentMethod} isDarkMode={isDarkMode} isArabic={isArabic} />
        {order.notes && (
          <div className={`p-4 sm:p-5 rounded-lg sm:rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <p className={`text-xs sm:text-sm font-semibold mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'ملاحظات' : 'Notes'}
            </p>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} ${isArabic ? 'text-right' : 'text-left'}`}>
              {order.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
