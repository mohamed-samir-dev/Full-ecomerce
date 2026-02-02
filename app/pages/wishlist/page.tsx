'use client';

import { useRouter } from 'next/navigation';
import { useWishlist } from '@/hooks/useWishlist';
import WishlistHeader from './components/WishlistHeader';
import WishlistLoading from './components/WishlistLoading';
import EmptyWishlist from './components/EmptyWishlist';
import WishlistGrid from './components/WishlistGrid';

export default function WishlistPage() {
  const router = useRouter();
  const { items: wishlistItems, loading, removeFromWishlist } = useWishlist();

  const uniqueItems = wishlistItems.filter((item, index, self) => 
    index === self.findIndex(t => t._id === item._id)
  );

  console.log('Wishlist Page - Items:', uniqueItems);
  console.log('Wishlist Page - Loading:', loading);

  const handleRemove = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  const handleViewDetails = (productId: string) => {
    router.push(`/pages/product/${productId}`);
  };

  if (loading) {
    return <WishlistLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <WishlistHeader itemCount={uniqueItems.length} onBack={() => router.back()} />
        
        {uniqueItems.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <WishlistGrid
            items={uniqueItems}
            onRemove={handleRemove}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>
    </div>
  );
}
