const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api`;

const getAuthHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const cartService = {
  async getCart() {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || sessionStorage.getItem('token')) : null;
    if (!token) {
      return { success: true, cart: [] };
    }
    const res = await fetch(`${API_URL}/cart`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) {
      if (res.status === 401) {
        return { success: true, cart: [] };
      }
      throw new Error('Failed to fetch cart');
    }
    return res.json();
  },

  async addToCart(productId: string, quantity = 1) {
    const res = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ productId, quantity })
    });
    if (!res.ok) throw new Error('Failed to add to cart');
    return res.json();
  },

  async updateCartItem(productId: string, quantity: number) {
    const res = await fetch(`${API_URL}/cart/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ productId, quantity })
    });
    if (!res.ok) throw new Error('Failed to update cart');
    return res.json();
  },

  async removeFromCart(productId: string) {
    const res = await fetch(`${API_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to remove from cart');
    return res.json();
  },

  async clearCart() {
    const res = await fetch(`${API_URL}/cart/clear`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to clear cart');
    return res.json();
  }
};
