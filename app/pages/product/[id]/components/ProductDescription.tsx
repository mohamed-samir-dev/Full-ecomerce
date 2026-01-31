import { Product } from '../../../shop/types';

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">Description</h3>
      <div className="prose prose-gray prose-sm sm:prose-base max-w-none">
        {product.shortDescription && product.shortDescription !== product.description && (
          <div className="mb-4 sm:mb-5">
            <p className="text-xs sm:text-sm font-medium text-gray-600">{product.shortDescription}</p>
          </div>
        )}
        <p className="leading-relaxed whitespace-pre-line text-sm sm:text-base text-gray-700">
          {product.description || product.shortDescription}
        </p>
      </div>
    </div>
  );
}
