import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { RootState, AppDispatch } from '@/store';
import { addToWishlist, removeFromWishlist, clearWishlist, syncWishlist, setAuthenticated, addToWishlistAsync, removeFromWishlistAsync, clearWishlistAsync, fetchWishlist, syncWishlistWithServer, Product } from '@/store/slices/wishlistSlice';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export const useWishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.wishlist);
  const { user, token } = useAuth();
  const { isArabic } = useLanguage();
  const isAuthenticated = !!user && !!token;
  const hasSynced = useRef(false);

  useEffect(() => {
    dispatch(setAuthenticated(isAuthenticated));
    dispatch(syncWishlist());
    if (isAuthenticated && !hasSynced.current) {
      hasSynced.current = true;
      const localItems = localStorage.getItem('wishlist');
      if (localItems && JSON.parse(localItems).length > 0) {
        dispatch(syncWishlistWithServer()).then(() => {
          dispatch(fetchWishlist());
        });
      } else {
        dispatch(fetchWishlist());
      }
    } else if (!isAuthenticated) {
      hasSynced.current = false;
    }
  }, [dispatch, isAuthenticated, user, token]);

  const addItem = async (product: Product) => {
    const exists = items.find(item => item._id === product._id);
    if (exists) {
      toast.error(isArabic ? 'موجود بالفعل في قائمة الأمنيات' : 'Already in wishlist', { position: 'top-right' });
      return;
    }
    
    if (!isAuthenticated) {
      dispatch(addToWishlist(product));
      toast.success(isArabic ? `تمت إضافة ${product.name} إلى قائمة الأمنيات` : `${product.name} added to wishlist`, { position: 'top-right' });
      return;
    }
    
    try {
      await dispatch(addToWishlistAsync(product._id)).unwrap();
      toast.success(isArabic ? `تمت إضافة ${product.name} إلى قائمة الأمنيات` : `${product.name} added to wishlist`, { position: 'top-right' });
    } catch (error: unknown) {
      if (error === 'Authentication failed. Please login again.') {
        toast.error(isArabic ? 'يرجى تسجيل الدخول لإضافة عناصر إلى قائمة الأمنيات' : 'Please login to add items to wishlist', { position: 'top-right' });
        window.location.reload();
      } else {
        dispatch(addToWishlist(product));
        toast.success(isArabic ? `تمت إضافة ${product.name} إلى قائمة الأمنيات` : `${product.name} added to wishlist`, { position: 'top-right' });
      }
    }
  };

  const removeItem = async (productId: string) => {
    if (!isAuthenticated) {
      dispatch(removeFromWishlist(productId));
      toast.success(isArabic ? 'تم الحذف من قائمة الأمنيات' : 'Removed from wishlist', { position: 'top-right' });
      return;
    }
    
    try {
      await dispatch(removeFromWishlistAsync(productId)).unwrap();
      toast.success(isArabic ? 'تم الحذف من قائمة الأمنيات' : 'Removed from wishlist', { position: 'top-right' });
    } catch (error: unknown) {
      if (error === 'Authentication failed. Please login again.') {
        toast.error(isArabic ? 'يرجى تسجيل الدخول لإدارة قائمة الأمنيات' : 'Please login to manage wishlist', { position: 'top-right' });
        window.location.reload();
      } else {
        dispatch(removeFromWishlist(productId));
        toast.success(isArabic ? 'تم الحذف من قائمة الأمنيات' : 'Removed from wishlist', { position: 'top-right' });
      }
    }
  };

  const clearAllItems = async () => {
    try {
      if (isAuthenticated) {
        await dispatch(clearWishlistAsync()).unwrap();
      } else {
        dispatch(clearWishlist());
      }
      toast.success(isArabic ? 'تم تفريغ قائمة الأمنيات' : 'Wishlist cleared', { position: 'top-right' });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : (isArabic ? 'فشل في تفريغ قائمة الأمنيات' : 'Failed to clear wishlist');
      toast.error(errorMessage, { position: 'top-right' });
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item._id === productId);
  };

  return {
    items,
    loading,
    itemCount: items.length,
    addToWishlist: addItem,
    removeFromWishlist: removeItem,
    clearWishlist: clearAllItems,
    isInWishlist,
  };
};
