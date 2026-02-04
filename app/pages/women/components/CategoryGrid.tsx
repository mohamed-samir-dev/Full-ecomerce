import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'Apparel', image: '/images/clothes-clothing-shop.avif', slug: 'apparel' },
  { name: 'Shoes', image: '/images/shoes.avif', slug: 'shoes' },
  { name: 'Bags', image: '/images/bag.avif', slug: 'bags' },
  { name: 'Accessories', image: '/images/accesory.avif', slug: 'accessories' },
  { name: 'Beauty', image: '/images/beouty.webp', slug: 'beauty' }
];

export default function CategoryGrid() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-5 py-8 sm:py-12 lg:py-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={`/pages/women/${category.slug}`}>
            <div className="relative h-40 sm:h-52 lg:h-64 rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all cursor-pointer group">
              <Image src={category.image} alt={category.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <h3 className="text-white font-bold text-base sm:text-xl lg:text-2xl p-3 sm:p-4 lg:p-6 w-full text-center">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
