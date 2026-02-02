import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Product {
  _id: string;
  name: string;
  mainImage: string;
  basePrice: number;
  finalPrice?: number;
  stock: number;
}

interface WishlistState {
  items: Product[];
  loading: boolean;
  isAuthenticated: boolean;
}

const getLocalWishlist = (): Product[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('wishlist');
  if (!stored) return [];
  try {
    const items = JSON.parse(stored);
    return items.filter((item: Product, index: number, self: Product[]) => 
      index === self.findIndex(t => t._id === item._id)
    );
  } catch {
    return [];
  }
};

const saveLocalWishlist = (items: Product[]) => {
  if (typeof window !== 'undefined') {
    const uniqueItems = items.filter((item, index, self) => 
      index === self.findIndex(t => t._id === item._id)
    );
    localStorage.setItem('wishlist', JSON.stringify(uniqueItems));
  }
};

const initialState: WishlistState = {
  items: [],
  loading: false,
  isAuthenticated: false,
};

export const syncWishlistWithServer = createAsyncThunk('wishlist/syncWithServer', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token');
    }
    
    const localItems = getLocalWishlist();
    const productIds = localItems.map(item => item._id);
    
    const response = await axios.post(`${API_URL}/wishlist/sync`, 
      { productIds },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    localStorage.removeItem('wishlist');
    return response.data.wishlist;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Failed to sync wishlist');
    }
    return rejectWithValue('Failed to sync wishlist');
  }
});

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token');
    }
    const response = await axios.get(`${API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.wishlist;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Failed to fetch wishlist');
    }
    return rejectWithValue('Failed to fetch wishlist');
  }
});

export const addToWishlistAsync = createAsyncThunk('wishlist/add', async (productId: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No authentication token found');
    }
    const response = await axios.post(`${API_URL}/wishlist/add/${productId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.wishlist;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        return rejectWithValue('Authentication failed. Please login again.');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
    }
    return rejectWithValue('Failed to add to wishlist');
  }
});

export const removeFromWishlistAsync = createAsyncThunk('wishlist/remove', async (productId: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No authentication token found');
    }
    const response = await axios.delete(`${API_URL}/wishlist/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.wishlist;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        return rejectWithValue('Authentication failed. Please login again.');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
    }
    return rejectWithValue('Failed to remove from wishlist');
  }
});

export const clearWishlistAsync = createAsyncThunk('wishlist/clear', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No authentication token found');
    }
    const response = await axios.delete(`${API_URL}/wishlist/clear`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.wishlist;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        return rejectWithValue('Authentication failed. Please login again.');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to clear wishlist');
    }
    return rejectWithValue('Failed to clear wishlist');
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
        saveLocalWishlist(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveLocalWishlist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveLocalWishlist([]);
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    syncWishlist: (state) => {
      const localItems = getLocalWishlist();
      state.items = localItems.filter((item, index, self) => 
        index === self.findIndex(t => t._id === item._id)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload.filter((item: Product, index: number, self: Product[]) => 
          index === self.findIndex((t: Product) => t._id === item._id)
        );
        state.loading = false;
        saveLocalWishlist(state.items);
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
        state.items = getLocalWishlist();
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.items = action.payload.filter((item: Product, index: number, self: Product[]) => 
          index === self.findIndex((t: Product) => t._id === item._id)
        );
        saveLocalWishlist(state.items);
      })
      .addCase(addToWishlistAsync.rejected, () => {
      // Silently fail - fallback to local storage handled in hook
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.items = action.payload.filter((item: Product, index: number, self: Product[]) => 
          index === self.findIndex((t: Product) => t._id === item._id)
        );
        saveLocalWishlist(state.items);
      })
      .addCase(removeFromWishlistAsync.rejected, () => {
        // Silently fail - fallback to local storage handled in hook
      })
      .addCase(clearWishlistAsync.fulfilled, (state) => {
        state.items = [];
        saveLocalWishlist([]);
      })
      .addCase(clearWishlistAsync.rejected, () => {
        // Silently fail - fallback to local storage handled in hook
      })
      .addCase(syncWishlistWithServer.fulfilled, (state, action) => {
        state.items = action.payload.filter((item: Product, index: number, self: Product[]) => 
          index === self.findIndex((t: Product) => t._id === item._id)
        );
        saveLocalWishlist(state.items);
      });
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, setAuthenticated, syncWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
