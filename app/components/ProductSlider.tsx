import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';
import { Product } from '@/app/types/category';
import 'swiper/css';
import 'swiper/css/pagination';

interface ProductSliderProps {
  title: string;
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
  accentColor: string;
}

export default function ProductSlider({ title, products, loading, onAddToCart, accentColor }: ProductSliderProps) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-5 py-8 sm:py-12 lg:py-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-900">{title}</h2>
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: accentColor }}></div>
        </div>
      ) : (
        <Swiper
          modules={[Pagination]}
          spaceBetween={12}
          slidesPerView={1.5}
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 2.5, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 }
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} onAddToCart={onAddToCart} accentColor={accentColor} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
