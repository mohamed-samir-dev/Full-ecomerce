import { useState, useMemo } from 'react';
import { useCart } from '@/hooks/useCart';

export const useCartPage = () => {
  const { items: rawItems, total, itemCount, loading, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const items = rawItems.filter((item, index, self) => 
    index === self.findIndex(t => t.product._id === item.product._id)
  );

  const [showClearModal, setShowClearModal] = useState(false);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  const subtotal = total;
  const shipping = subtotal > 15000 ? 0 : 15;
  const tax = subtotal * 0.05;
  const finalTotal = subtotal + shipping + tax;
  
  const deliveryDateStr = useMemo(() => {
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + (shipping === 0 ? 2 : 5));
    return estimatedDelivery.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }, [shipping]);

  return {
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
  };
};
