import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { RootState, AppDispatch } from '@/store';
import { addToWishlist, removeFromWishlist, clearWishlist, syncWishlist, setAuthenticated, addToWishlistAsync, removeFromWishlistAsync, clearWishlistAsync, fetchWishlist, syncWishlistWithServer, Product } from '@/store/slices/wishlistSlice';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export const useWishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.wishlist);
  const { user, token } = useAuth();
  const isAuthenticated = !!user && !!token;
  const hasSynced = useRef(false);

  console.log('useWishlist - Items from Redux:', items);
  console.log('useWishlist - Loading:', loading);
  console.log('useWishlist - isAuthenticated:', isAuthenticated);

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
      toast.error('Already in wishlist', { position: 'top-right' });
      return;
    }
    
    console.log('addItem - isAuthenticated:', isAuthenticated);
    console.log('addItem - product:', product);
    
    if (!isAuthenticated) {
      dispatch(addToWishlist(product));
      toast.success(`${product.name} added to wishlist`, { position: 'top-right' });
      return;
    }
    
    try {
      console.log('Calling addToWishlistAsync with productId:', product._id);
      const result = await dispatch(addToWishlistAsync(product._id)).unwrap();
      console.log('addToWishlistAsync success:', result);
      toast.success(`${product.name} added to wishlist`, { position: 'top-right' });
    } catch (error: unknown) {
      console.error('addToWishlistAsync failed:', error);
      if (error === 'Authentication failed. Please login again.') {
        toast.error('Please login to add items to wishlist', { position: 'top-right' });
        window.location.reload();
      } else {
        console.log('Falling back to localStorage');
        dispatch(addToWishlist(product));
        toast.success(`${product.name} added to wishlist`, { position: 'top-right' });
      }
    }
  };

  const removeItem = async (productId: string) => {
    if (!isAuthenticated) {
      dispatch(removeFromWishlist(productId));
      toast.success('Removed from wishlist', { position: 'top-right' });
      return;
    }
    
    try {
      await dispatch(removeFromWishlistAsync(productId)).unwrap();
      toast.success('Removed from wishlist', { position: 'top-right' });
    } catch (error: any) {
      if (error === 'Authentication failed. Please login again.') {
        toast.error('Please login to manage wishlist', { position: 'top-right' });
        window.location.reload();
      } else {
        dispatch(removeFromWishlist(productId));
        toast.success('Removed from wishlist', { position: 'top-right' });
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
      toast.success('Wishlist cleared', { position: 'top-right' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to clear wishlist', { position: 'top-right' });
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
