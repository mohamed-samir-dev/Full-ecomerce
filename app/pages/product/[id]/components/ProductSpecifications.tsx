import { Product } from '../../../shop/types';

interface ProductSpecificationsProps {
  product: Product;
}

export default function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const specs = [
    { label: 'Brand', value: product.brand },
    { label: 'Category', value: product.category },
    { label: 'SKU', value: product.sku },
    { label: 'Availability', value: product.availability.replace('_', ' ').toUpperCase() },
    { label: 'Stock', value: product.stock > 0 ? `${product.stock} units` : 'Out of stock' },
    ...(product.sizes && product.sizes.length > 0 ? [{ label: 'Available Sizes', value: product.sizes.join(', ') }] : []),
    ...(product.colors && product.colors.length > 0 ? [{ label: 'Available Colors', value: product.colors.map(c => c.name).join(', ') }] : []),
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Specifications</h3>
      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
            <span className="text-sm font-medium text-gray-600">{spec.label}</span>
            <span className="text-sm text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
