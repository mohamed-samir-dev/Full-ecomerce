'use client';

import { useRouter } from 'next/navigation';
import { useWishlist } from '@/hooks/useWishlist';
import { useTheme } from '@/context/ThemeContext';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import WishlistHeader from './components/WishlistHeader';
import WishlistLoading from './components/WishlistLoading';
import EmptyWishlist from './components/EmptyWishlist';
import WishlistGrid from './components/WishlistGrid';

export default function WishlistPage() {
  const router = useRouter();
  const { items: wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { isDarkMode } = useTheme();

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
    <>
      <DynamicMetadata
        titleAr="قائمة الأمنيات - منتجاتك المفضلة"
        titleEn="Wishlist - Your Favorite Products"
        descriptionAr="احفظ منتجاتك المفضلة في قائمة الأمنيات للعودة إليها لاحقاً. قائمة أمنيات مخصصة لك"
        descriptionEn="Save your favorite products in your wishlist to return to them later. Personalized wishlist for you"
        keywordsAr={['قائمة الأمنيات', 'مفضلات', 'منتجات مفضلة']}
        keywordsEn={['wishlist', 'favorites', 'favorite products']}
      />
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
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
    </>
  );
}
