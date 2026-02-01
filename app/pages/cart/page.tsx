'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';
import CartHeader from './components/cartheader/CartHeader';
import EmptyCart from './components/cart-ui/EmptyCart';
import CartItem from './components/cartitem/CartItem';
import OrderSummary from './components/ordersammary/OrderSummary';
import ClearCartModal from './components/cart-ui/ClearCartModal';
import CartLoading from './components/cart-ui/CartLoading';
import { useCartPage } from './hooks/useCartPage';

export default function Cart() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const { user } = useAuth();
  const {
    items,
    total,
    itemCount,
    loading,
    showClearModal,
    setShowClearModal,
    handleRemoveItem,
    handleUpdateQuantity,
    handleClearCart,
    confirmClearCart,
    subtotal,
    shipping,
    tax,
    finalTotal,
    deliveryDateStr
  } = useCartPage();

  return (
    <div className={`min-h-screen py-4 sm:py-6 lg:py-8 ${
      isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
    }`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <CartHeader 
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          itemCount={itemCount}
          total={total}
          subtotal={subtotal}
        />
        
        {loading ? (
          <CartLoading isDarkMode={isDarkMode} />
        ) : items.length === 0 ? (
          <EmptyCart isDarkMode={isDarkMode} isArabic={isArabic} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  isDarkMode={isDarkMode}
                  isArabic={isArabic}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
            <OrderSummary
              isDarkMode={isDarkMode}
              isArabic={isArabic}
              itemCount={itemCount}
              itemsLength={items.length}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              finalTotal={finalTotal}
              deliveryDateStr={deliveryDateStr}
              user={user}
              onClearCart={handleClearCart}
            />
          </div>
        )}
      </div>
      <ClearCartModal
        isOpen={showClearModal}
        isDarkMode={isDarkMode}
        isArabic={isArabic}
        onConfirm={confirmClearCart}
        onCancel={() => setShowClearModal(false)}
      />
    </div>
  );
}
