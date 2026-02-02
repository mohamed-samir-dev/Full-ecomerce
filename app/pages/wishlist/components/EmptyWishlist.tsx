import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function EmptyWishlist() {
  return (
    <div className="text-center py-12 sm:py-16 rounded-lg bg-white">
      <HeartIcon className="h-16 w-16 sm:h-24 sm:w-24 mx-auto mb-3 sm:mb-4 text-gray-400" />
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">
        Your wishlist is empty
      </h2>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">
        Start adding products you love!
      </p>
      <Link
        href="/pages/shop"
        className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
}
