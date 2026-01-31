import {StockIndicatorProps}from '../../types/types'

export default function StockIndicator({ isOutOfStock, stock }: StockIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${
        isOutOfStock ? 'bg-red-500' : stock <= 10 ? 'bg-yellow-500' : 'bg-green-500'
      }`} />
      <span className={`text-xs sm:text-sm font-medium ${
        isOutOfStock ? 'text-red-600' : stock <= 10 ? 'text-yellow-600' : 'text-green-600'
      }`}>
        {isOutOfStock ? 'Out of Stock' : stock <= 10 ? `Only ${stock} left` : 'In Stock'}
      </span>
    </div>
  );
}
