
import {PriceDisplayProps}from '../../types/types'

export default function PriceDisplay({ finalPrice, basePrice, hasDiscount, discountPercentage }: PriceDisplayProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <span className="text-2xl sm:text-3xl font-bold text-gray-900">
        {finalPrice} EGP
      </span>
      {hasDiscount && (
        <>
          <span className="text-lg sm:text-xl line-through text-gray-500">
            {basePrice} EGP
          </span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs sm:text-sm font-semibold">
            {discountPercentage}% OFF
          </span>
        </>
      )}
    </div>
  );
}
