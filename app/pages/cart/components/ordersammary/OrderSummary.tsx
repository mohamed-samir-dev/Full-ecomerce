'use client';

import {OrderSummaryProps}from '../../types/cart'
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
  onClearCart
}: OrderSummaryProps) {
  return (
    <div className={`rounded-xl sm:rounded-2xl border-2 p-4 sm:p-5 md:p-6 lg:p-8 h-fit lg:sticky lg:top-6 shadow-xl ${
      isDarkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
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
      
      <div className="space-y-2.5 sm:space-y-3 md:space-y-4 mt-4 sm:mt-5 md:mt-6 lg:mt-8">
        <PromoCode isDarkMode={isDarkMode} isArabic={isArabic} />
        <CheckoutButton isDarkMode={isDarkMode} isArabic={isArabic} user={user} onClearCart={onClearCart} />
      </div>
    </div>
  );
}
