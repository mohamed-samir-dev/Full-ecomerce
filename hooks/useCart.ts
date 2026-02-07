import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { RootState, AppDispatch } from '@/store';
import { addToCart, removeFromCart, updateQuantity, clearCart, syncCart, setAuthenticated, addToCartAsync, updateCartAsync, removeFromCartAsync, clearCartAsync, fetchCart, Product } from '@/store/slices/cartSlice';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { migrateLocalCartToDatabase } from '@/services/cartMigration';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total, itemCount, loading } = useSelector((state: RootState) => state.cart);
  const { user } = useAuth();
  const { isArabic } = useLanguage();
  const isAuthenticated = !!user;
  const hasMigrated = useRef(false);

  useEffect(() => {
    dispatch(setAuthenticated(isAuthenticated));
    if (isAuthenticated && user && !hasMigrated.current) {
      hasMigrated.current = true;
      migrateLocalCartToDatabase().then(() => {
        dispatch(fetchCart());
      }).catch(() => {
        dispatch(fetchCart());
      });
    } else if (!isAuthenticated) {
      hasMigrated.current = false;
      dispatch(syncCart());
    }
  }, [dispatch, isAuthenticated, user]);

  const addItem = async (product: Product) => {
    const existingItem = items.find(item => item.product._id === product._id);
    if (existingItem && existingItem.quantity >= product.stock) {
      toast.error(isArabic ? 'تم الوصول للحد الأقصى من المخزون' : 'Maximum stock reached', { position: 'top-right' });
      return;
    }
    try {
      if (isAuthenticated) {
        await dispatch(addToCartAsync(product)).unwrap();
      } else {
        dispatch(addToCart(product));
      }
      toast.success(isArabic ? `تمت إضافة ${product.name} إلى السلة` : `${product.name} added to cart`, { position: 'top-right' });
    } catch (error: any) {
      toast.error(error.message || (isArabic ? 'فشل في الإضافة إلى السلة' : 'Failed to add to cart'), { position: 'top-right' });
    }
  };

  const removeItem = async (productId: string) => {
    try {
      if (isAuthenticated) {
        await dispatch(removeFromCartAsync(productId)).unwrap();
      } else {
        dispatch(removeFromCart(productId));
      }
      toast.success(isArabic ? 'تم الحذف من السلة' : 'Removed from cart', { position: 'top-right' });
    } catch (error: any) {
      toast.error(error.message || (isArabic ? 'فشل في الحذف من السلة' : 'Failed to remove from cart'), { position: 'top-right' });
    }
  };

  const updateItemQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      if (isAuthenticated) {
        await dispatch(updateCartAsync({ productId, quantity })).unwrap();
      } else {
        dispatch(updateQuantity({ productId, quantity }));
      }
    } catch (error: any) {
      toast.error(error.message || (isArabic ? 'فشل في تحديث الكمية' : 'Failed to update quantity'), { position: 'top-right' });
    }
  };

  const clearAllItems = async () => {
    try {
      if (isAuthenticated) {
        await dispatch(clearCartAsync()).unwrap();
      } else {
        dispatch(clearCart());
      }
      toast.success(isArabic ? 'تم تفريغ السلة' : 'Cart cleared', { position: 'top-right' });
    } catch (error: any) {
      toast.error(error.message || (isArabic ? 'فشل في تفريغ السلة' : 'Failed to clear cart'), { position: 'top-right' });
    }
  };

  return {
    items,
    total,
    itemCount,
    loading,
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity: updateItemQuantity,
    clearCart: clearAllItems,
  };
};
