'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '../../data/homeData';
import { useTranslation } from '@/i18n';

export default function LuxuryCategorySection() {
  const { t, isArabic } = useTranslation();

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 bg-linear-to-br from-[#fdfbf7] via-[#f8f6f1] to-[#f5f2eb] relative overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_50%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-gray-900 mb-2 tracking-tighter">
              {t('home.category.title')}
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-[2px] bg-linear-to-r from-transparent via-gray-800 to-transparent mx-auto mt-4 sm:mt-6 md:mt-8"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {categories.map((category) => (
            <div key={category.id}>
              <Link href={category.link}>
                <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                  <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10 group-hover:from-black/40 transition-all duration-700" />
                    <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-30 transition-all duration-700 z-10 mix-blend-overlay`} />
                    <Image
                      src={category.image}
                      alt={t(category.nameKey)}
                      fill
                      loading="lazy"
                      quality={60}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-4 md:p-5 lg:p-6">
                      <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white tracking-wider mb-1 sm:mb-2 drop-shadow-lg">
                          {t(category.nameKey)}
                        </h3>
                        <div className="hidden sm:flex items-center gap-2 text-white/90 text-xs sm:text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <span className="font-light">{t('home.category.shopNow')}</span>
                          <svg 
                            className={`w-5 h-5 transition-transform group-hover:${isArabic ? '-translate-x-1' : 'translate-x-1'}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`hidden sm:flex absolute top-3 ${isArabic ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100`}>
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
