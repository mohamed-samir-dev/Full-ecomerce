import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Star, Shield, Truck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { HeroContentProps } from '../../../types/home.types';

export const HeroContent = ({ slide, currentSlide, isArabic, t }: HeroContentProps) => {
  const { isDarkMode } = useTheme();
  const isFirstSlide = currentSlide === 0;

  const stats = [
    {
      icon: <ShoppingBag size={22} />,
      value: String(t('home.hero.stat.productsValue')),
      label: String(t('home.hero.stat.products')),
    },
    {
      icon: <Star size={22} />,
      value: '4.9★',
      label: String(t('home.hero.stat.rating')),
    },
    {
      icon: <Truck size={22} />,
      value: String(t('home.hero.stat.shippingValue')),
      label: String(t('home.hero.stat.shipping')),
    },
    {
      icon: <Shield size={22} />,
      value: String(t('home.hero.stat.returnsValue')),
      label: String(t('home.hero.stat.returns')),
    },
  ];

  if (isFirstSlide) {
    return (
      <div
        className={`w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col ${
          isArabic ? 'items-end text-right' : 'items-start text-left'
        }`}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-semibold text-white">
            {String(t('home.hero.newSeasonArrivals'))}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 leading-[1.1] text-white drop-shadow-md"
        >
          {String(t('home.hero.newSeasonSubtitle'))}{' '}
          <span className="text-[#C9A84C]">{String(t('home.hero.newSeasonHighlight'))}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="text-sm sm:text-base mb-5 leading-relaxed text-white/80 max-w-sm"
        >
          {String(t('home.hero.newSeasonDescription'))}
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className={`flex flex-wrap gap-3 mb-6 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 min-w-[120px] hover:bg-white/15 transition-colors ${
                isArabic ? 'flex-row-reverse text-right' : 'flex-row text-left'
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
                {stat.icon}
              </div>
              <div>
                <div className="text-white font-bold text-base leading-tight">{stat.value}</div>
                <div className="text-white/60 text-xs leading-tight mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.36 }}
          className={`flex flex-wrap gap-3 ${
            isArabic ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <Link
            href={slide.buttonLink}
            className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: '#8B6914' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6e5210'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B6914'}
          >
            <ShoppingBag size={15} />
            {String(t('home.hero.shopNow'))}
          </Link>
          <Link
            href="/pages/shop"
            className="inline-block px-7 py-3 rounded-full font-semibold text-sm border border-white/50 text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:scale-105"
          >
            {String(t('home.hero.explore') || 'Explore')}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center items-center text-center ${
      isArabic ? 'lg:items-end lg:text-right lg:pr-14' : 'lg:items-start lg:text-left lg:pl-14'
    }`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-sm uppercase tracking-wide mb-4 ${isArabic ? 'lg:text-right' : 'lg:text-left'} ${
            isDarkMode ? 'text-gray-300' : 'lg:text-[#4E504C] text-gray-200'
          }`}
        >
          {String(t(slide.descriptionKey))}
        </motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 ${isArabic ? 'lg:text-right' : 'lg:text-left'} ${
            isDarkMode ? 'text-white' : 'lg:text-[#030303] text-white'
          }`}
        >
          {String(t(slide.titleKey))}
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={slide.buttonLink}
            className="inline-block text-white px-10 py-4 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: '#8B6914' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6e5210'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B6914'}
          >
            {String(t(slide.buttonTextKey))}
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
