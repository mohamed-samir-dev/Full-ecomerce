import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '@/services/cartService';

export interface Product {
  _id: string;
  name: string;
  nameAr?: string;
  mainImage: string;
  basePrice: number;
  finalPrice?: number;
  stock: number;
  category?: string;
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  lastUpdated: number;
  loading: boolean;
  isAuthenticated: boolean;
}

const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') return { items: [], total: 0, itemCount: 0, lastUpdated: Date.now(), loading: false, isAuthenticated: false };
  const token = localStorage.getItem('token');
  if (token) return { items: [], total: 0, itemCount: 0, lastUpdated: Date.now(), loading: false, isAuthenticated: true };
  try {
    const saved = localStorage.getItem('cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, lastUpdated: Date.now(), loading: false, isAuthenticated: false };
    }
  } catch (error) {
    console.error('Failed to load cart:', error);
  }
  return { items: [], total: 0, itemCount: 0, lastUpdated: Date.now(), loading: false, isAuthenticated: false };
};

const saveCartToStorage = (state: CartState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => {
    const price = Number(item.product.finalPrice || item.product.basePrice) || 0;
    return sum + price * item.quantity;
  }, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

const initialState: CartState = loadCartFromStorage();

const transformBackendCart = (backendCart: Array<{
  productId: {
    _id: string;
    name: string;
    nameAr?: string;
    mainImage: string;
    basePrice: number;
    finalPrice?: number;
    stock: number;
    category?: string;
    brand?: string;
  };
  quantity: number;
}>): CartItem[] => {
  return backendCart.map(item => ({
    product: {
      _id: item.productId._id,
      name: item.productId.name,
      nameAr: item.productId.nameAr,
      mainImage: item.productId.mainImage,
      basePrice: item.productId.basePrice,
      finalPrice: item.productId.finalPrice,
      stock: item.productId.stock,
      category: item.productId.category,
      brand: item.productId.brand
    },
    quantity: item.quantity,
    addedAt: Date.now()
  }));
};

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const res = await cartService.getCart();
  if (!res.success) throw new Error(res.message);
  return res.cart;
});

export const addToCartAsync = createAsyncThunk('cart/add', async (product: Product) => {
  const res = await cartService.addToCart(product._id, 1);
  if (!res.success) throw new Error(res.message);
  return res.cart;
});

export const updateCartAsync = createAsyncThunk('cart/update', async ({ productId, quantity }: { productId: string; quantity: number }) => {
  const res = await cartService.updateCartItem(productId, quantity);
  if (!res.success) throw new Error(res.message);
  return res.cart;
});

export const removeFromCartAsync = createAsyncThunk('cart/remove', async (productId: string) => {
  const res = await cartService.removeFromCart(productId);
  if (!res.success) throw new Error(res.message);
  return res.cart;
});

export const clearCartAsync = createAsyncThunk('cart/clear', async () => {
  const res = await cartService.clearCart();
  if (!res.success) throw new Error(res.message);
  return res.cart;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (state.isAuthenticated) return;
      const existingItem = state.items.find(item => item.product._id === action.payload._id);
      if (existingItem) {
        if (existingItem.quantity < action.payload.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ product: action.payload, quantity: 1, addedAt: Date.now() });
      }
      const totals = calculateTotals(state.items);
      state.total = totals.total;
      state.itemCount = totals.itemCount;
      state.lastUpdated = Date.now();
      saveCartToStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      if (state.isAuthenticated) return;
      state.items = state.items.filter(item => item.product._id !== action.payload);
      const totals = calculateTotals(state.items);
      state.total = totals.total;
      state.itemCount = totals.itemCount;
      state.lastUpdated = Date.now();
      saveCartToStorage(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      if (state.isAuthenticated) return;
      const item = state.items.find(item => item.product._id === action.payload.productId);
      if (item) {
        const newQty = Math.min(Math.max(1, action.payload.quantity), item.product.stock);
        item.quantity = newQty;
      }
      const totals = calculateTotals(state.items);
      state.total = totals.total;
      state.itemCount = totals.itemCount;
      state.lastUpdated = Date.now();
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      if (state.isAuthenticated) return;
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      state.lastUpdated = Date.now();
      saveCartToStorage(state);
    },
    syncCart: (state) => {
      const totals = calculateTotals(state.items);
      state.total = totals.total;
      state.itemCount = totals.itemCount;
      state.lastUpdated = Date.now();
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        const loaded = loadCartFromStorage();
        state.items = loaded.items;
        state.total = loaded.total;
        state.itemCount = loaded.itemCount;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = transformBackendCart(action.payload);
        const totals = calculateTotals(state.items);
        state.total = totals.total;
        state.itemCount = totals.itemCount;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state) => { state.loading = false; })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.items = transformBackendCart(action.payload);
        const totals = calculateTotals(state.items);
        state.total = totals.total;
        state.itemCount = totals.itemCount;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.items = transformBackendCart(action.payload);
        const totals = calculateTotals(state.items);
        state.total = totals.total;
        state.itemCount = totals.itemCount;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = transformBackendCart(action.payload);
        const totals = calculateTotals(state.items);
        state.total = totals.total;
        state.itemCount = totals.itemCount;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
        state.itemCount = 0;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, syncCart, setAuthenticated } = cartSlice.actions;
export default cartSlice.reducer;
