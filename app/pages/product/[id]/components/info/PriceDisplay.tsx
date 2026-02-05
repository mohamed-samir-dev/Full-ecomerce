
import {PriceDisplayProps}from '../../types/types'

export default function PriceDisplay({ finalPrice, basePrice, hasDiscount, discountPercentage }: PriceDisplayProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span className="text-4xl font-light text-[#B39E7A]">
        {finalPrice}
      </span>
      <span className="text-xl text-gray-400">EGP</span>
      {hasDiscount && (
        <span className="text-xl line-through text-gray-400">
          {basePrice} EGP
        </span>
      )}
    </div>
  );
}
