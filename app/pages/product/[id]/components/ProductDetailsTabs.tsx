import { useState } from 'react';
import { Product } from '../../../shop/types';

interface ProductDetailsTabsProps {
  product: Product;
}

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');

  const specs = [
    { label: 'Brand', value: product.brand },
    { label: 'Category', value: product.category },
    { label: 'SKU', value: product.sku },
    { label: 'Availability', value: product.availability.replace('_', ' ').toUpperCase() },
    { label: 'Stock', value: product.stock > 0 ? `${product.stock} units` : 'Out of stock' },
    ...(product.sizes?.length ? [{ label: 'Available Sizes', value: product.sizes.join(', ') }] : []),
    ...(product.colors?.length ? [{ label: 'Available Colors', value: product.colors.map(c => c.name).join(', ') }] : []),
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('description')}
          className={`flex-1 py-3 px-3 sm:py-4 sm:px-6 text-sm sm:text-base font-medium transition-colors ${
            activeTab === 'description' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('specifications')}
          className={`flex-1 py-3 px-3 sm:py-4 sm:px-6 text-sm sm:text-base font-medium transition-colors ${
            activeTab === 'specifications' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Specifications
        </button>
      </div>

      <div className="p-4 sm:p-6">
        {activeTab === 'description' ? (
          <div className="space-y-4 sm:space-y-6">
            {product.shortDescription && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Aizo</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.shortDescription}</p>
              </div>
            )}
            {product.description && (
              <div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-0 gap-1">
                <span className="text-xs sm:text-sm font-medium text-gray-600">{spec.label}</span>
                <span className="text-xs sm:text-sm text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
