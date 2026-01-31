'use client';

import { promoItems } from '../../data/homeData';
import { PromoCard } from './PromoCard';

export default function PromoSection() {
  return (
    <div className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left text-gray-900">
          Why Shop With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {promoItems.map((item) => (
            <PromoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
