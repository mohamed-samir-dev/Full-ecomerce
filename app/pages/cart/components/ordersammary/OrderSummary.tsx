'use client';

import { OrderSummaryProps } from '../../types/cart';
import SummaryHeader from './components/SummaryHeader';
import PriceBreakdown from './components/PriceBreakdown';
import PromoCode from './components/PromoCode';
import CheckoutButton from './components/CheckoutButton';

export default function OrderSummary({
  isDarkMode,
  isArabic,
  itemCount,
  itemsLength,
  subtotal,
  shipping,
  tax,
  finalTotal,
  deliveryDateStr,
  user,
  onClearCart,
}: OrderSummaryProps) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 h-fit lg:sticky lg:top-6 shadow-xl transition-all ${
        isDarkMode
          ? 'bg-[#1F2329] border-white/5 hover:border-[#C9A84C]/20'
          : 'bg-white border-black/5 hover:border-[#C9A84C]/20'
      }`}
    >
      <SummaryHeader isDarkMode={isDarkMode} isArabic={isArabic} />
      <PriceBreakdown
        isDarkMode={isDarkMode}
        isArabic={isArabic}
        itemCount={itemCount}
        itemsLength={itemsLength}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        finalTotal={finalTotal}
        deliveryDateStr={deliveryDateStr}
      />
      <div className="space-y-3 mt-6">
        <PromoCode isDarkMode={isDarkMode} isArabic={isArabic} />
        <CheckoutButton isDarkMode={isDarkMode} isArabic={isArabic} user={user} onClearCart={onClearCart} />
      </div>
    </div>
  );
}
