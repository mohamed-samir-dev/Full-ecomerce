import { Product } from '../../../../shop/types';
import { useState } from 'react';
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
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isOutOfStock = product.stock === 0 || product.availability === 'out_of_stock';
  const hasDiscount = !!(product.discount && product.discount.value > 0);
  const discountPercentage = hasDiscount && product.discount?.type === 'percentage'
    ? product.discount.value
    : hasDiscount && product.discount?.type === 'fixed'
    ? Math.round((product.discount.value / product.basePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    console.log('Add to cart:', { product, selectedQuantity, selectedSize, selectedColor });
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-gray-900">{product.name}</h1>
      
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

      <ActionButtons
        isOutOfStock={isOutOfStock}
        isWishlisted={isWishlisted}
        onAddToCart={handleAddToCart}
        onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
      />
    </div>
  );
}
