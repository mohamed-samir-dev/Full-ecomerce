import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { ProductCardProps } from '../types';



export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 sm:h-56 lg:h-64">
        <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 truncate">{product.name}</h3>
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <span className="text-base sm:text-lg font-bold text-[#C11069]">{product.finalPrice} EGP</span>
          {product.basePrice > product.finalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">{product.basePrice} EGP</span>
          )}
        </div>
        <button
          onClick={() => onAddToCart({
            _id: product._id,
            name: product.name,
            nameAr: product.nameAr,
            mainImage: product.mainImage,
            basePrice: product.basePrice,
            finalPrice: product.finalPrice,
            stock: product.stock,
            category: product.category,
            brand: product.brand
          })}
          disabled={product.stock === 0 || product.availability === 'out_of_stock'}
          className={`w-full py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1 sm:gap-1.5 ${
            product.stock === 0 || product.availability === 'out_of_stock'
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#C11069] text-white hover:bg-[#6D093B] cursor-pointer"
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {product.stock === 0 || product.availability === 'out_of_stock' ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
