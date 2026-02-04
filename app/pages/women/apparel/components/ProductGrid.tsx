import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { Product } from "../types/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <main className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 font-light">
          <span className="text-2xl font-light text-gray-900">{products.length}</span> {products.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <Link key={product._id} href={`/pages/product/${product._id}`} className="group">
            <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-500 border border-transparent hover:border-amber-100">
              <div className="aspect-3/4 relative overflow-hidden bg-gray-100">
                <Image src={product.mainImage} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                {product.basePrice > product.finalPrice && (
                  <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    -{Math.round((1 - product.finalPrice / product.basePrice) * 100)}%
                  </div>
                )}
               
              </div>
              <div className="p-5">
                <h3 className="font-light text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-[#B39E7A] transition-colors">{product.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.floor(product.averageRating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({product.totalReviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-light text-[#B39E7A]">{product.finalPrice}</span>
                    <span className="text-sm text-gray-400">EGP</span>
                    {product.basePrice > product.finalPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.basePrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.preventDefault(); router.push(`/pages/product/${product._id}`); }} className="w-10 h-10 cursor-pointer bg-[#B39E7A]  rounded-full flex items-center justify-center hover:bg-[#B39E7A] hover:border-[#B39E7A] hover:text-white transition-all shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button onClick={(e) => { e.preventDefault(); addToCart(product); }} className="w-10 h-10 bg-[#B39E7A] cursor-pointer rounded-full flex items-center justify-center hover:bg-[#B39E7A] hover:border-[#B39E7A] hover:text-white transition-all shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-24">
          <div className="text-6xl mb-4 opacity-20">✨</div>
          <p className="text-gray-400 font-light text-lg">No pieces match your selection</p>
        </div>
      )}
    </main>
  );
}
