import { cartService } from './cartService';

let isMigrating = false;

export const migrateLocalCartToDatabase = async () => {
  if (isMigrating) return;
  isMigrating = true;
  
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    const localCart = localStorage.getItem('cart');
    if (!localCart) return;

    const parsed = JSON.parse(localCart);
    if (!parsed.items || parsed.items.length === 0) {
      localStorage.removeItem('cart');
      return;
    }

    const { cart: serverCart } = await cartService.getCart();
    const serverItems = new Map(serverCart.map((item: { productId: { _id: string }; quantity: number }) => [item.productId._id, item.quantity]));

    for (const item of parsed.items) {
      try {
        if (!serverItems.has(item.product._id)) {
          await cartService.addToCart(item.product._id, item.quantity);
        }
      } catch  {
        // Silently continue if one item fails
      }
    }

    localStorage.removeItem('cart');
  } catch  {
    // Silently fail - cart will be fetched from server anyway
  } finally {
    isMigrating = false;
  }
};
