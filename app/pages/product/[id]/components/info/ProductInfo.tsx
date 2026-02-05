/* cspell:ignore Wishlisted */
import { Product } from '../../../../shop/types';
import { useState } from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import PriceDisplay from './PriceDisplay';
import StockIndicator from './StockIndicator';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import ActionButtons from './ActionButtons';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product._id);

  const isOutOfStock = product.stock === 0 || product.availability === 'out_of_stock';
  const hasDiscount = !!(product.discount?.value && product.discount.value > 0);
  const discountPercentage = hasDiscount && product.discount
    ? product.discount.type === 'percentage'
      ? product.discount.value
      : Math.round((product.discount.value / product.basePrice) * 100)
    : 0;

  const handleAddToCart = () => addToCart(product);

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 h-full flex flex-col">
      {/* Product Title & Brand */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-amber-50 text-[#B39E7A] text-xs sm:text-sm font-medium rounded-full border border-amber-100">
            {product.brand}
          </span>
          {hasDiscount && (
            <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-rose-50 text-rose-600 text-xs sm:text-sm font-medium rounded-full border border-rose-100">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">{product.name}</h1>
        
      </div>

      <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <PriceDisplay
        finalPrice={product.finalPrice}
        basePrice={product.basePrice}
        hasDiscount={hasDiscount}
        discountPercentage={discountPercentage}
      />

      <StockIndicator isOutOfStock={isOutOfStock} stock={product.stock} />

      <ColorSelector
        colors={product.colors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      <SizeSelector
        sizes={product.sizes || []}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      {!isOutOfStock && (
        <QuantitySelector
          quantity={selectedQuantity}
          maxStock={product.stock}
          onQuantityChange={setSelectedQuantity}
        />
      )}

      <div className="flex-1"></div>

      <ActionButtons
        isOutOfStock={isOutOfStock}
        isWishlisted={isWishlisted}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
}
