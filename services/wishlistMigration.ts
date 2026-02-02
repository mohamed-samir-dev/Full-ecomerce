import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface WishlistItem {
  _id: string;
}

export const migrateLocalWishlistToDatabase = async () => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    const localWishlist = localStorage.getItem('wishlist');
    if (!localWishlist) return;

    const items = JSON.parse(localWishlist);
    if (!items || items.length === 0) {
      localStorage.removeItem('wishlist');
      return;
    }

    const productIds = items.map((item: WishlistItem) => item._id);
    await axios.post(`${API_URL}/wishlist/sync`, { productIds }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.removeItem('wishlist');
  } catch  {
    // Silently fail
  }
};
