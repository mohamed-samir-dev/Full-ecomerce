import WishlistItem from './WishlistItem';

interface Product {
  _id: string;
  name: string;
  mainImage?: string;
  basePrice: number;
  finalPrice?: number;
}

interface WishlistGridProps {
  items: Product[];
  onRemove: (productId: string) => void;
  onViewDetails: (productId: string) => void;
}

export default function WishlistGrid({ items, onRemove, onViewDetails }: WishlistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {items.map((product) => (
        <WishlistItem
          key={product._id}
          product={product}
          onRemove={onRemove}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
