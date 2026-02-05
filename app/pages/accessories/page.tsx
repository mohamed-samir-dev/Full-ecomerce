import HeroBanner from '@/app/components/HeroBanner';
import BrowseCategories from '@/app/components/BrowseCategories';

const categories = [
  { image: '/images/Silk and scarves.avif', title: 'Silk and scarves', link: '/pages/accessories/bags', size: 'small' as const },
  { image: '/images/watch.avif', title: 'Watches', link: '/pages/accessories/watches', size: 'large' as const },
  { image: '/images/glassess.avif', title: 'Sunglasses', link: '/pages/accessories/sunglasses', size: 'large' as const },
  { image: '/images/luxurious-shiny-golden-chain.avif', title: 'Jewelry', link: '/pages/accessories/jewelry', size: 'small' as const },

];

export default function AccessoriesPage() {
  return (
    <div className="bg-white min-h-screen py-3 sm:py-5">
      <HeroBanner 
        image="/images/accessory.avif" 
        title=" Art in the Details" 
        description="Discover exquisite pieces of fine accessories" 
        buttonText="Shop Shoes" 
        buttonLink="/pages/shoes/collection" 
        buttonColor="#C1883E" 
        buttonHoverColor="#E0C49F"
        titleColor="#C1883E"
      />
      <BrowseCategories categories={categories} />
    </div>
  );
}
