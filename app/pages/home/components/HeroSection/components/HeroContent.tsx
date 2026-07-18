import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Star, Shield, Truck, ArrowLeft, ArrowRight, Crown, Gem, Sparkles, Sun } from 'lucide-react';
import { HeroContentProps } from '../../../types/home.types';

interface ExtendedHeroContentProps extends HeroContentProps {
  slideIndex: number;
}

export const HeroContent = ({ slide, isArabic, t, slideIndex }: ExtendedHeroContentProps) => {
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;
  const isPremium = slideIndex === 1;
  const isSummer = slideIndex === 2;

  const stats = isPremium
    ? [
        { icon: <Crown size={20} />, value: String(t('home.hero.stat.productsValue')), label: String(t('home.hero.stat.products')) },
        { icon: <Gem size={20} />, value: '4.9★', label: String(t('home.hero.stat.rating')) },
        { icon: <Sparkles size={20} />, value: String(t('home.hero.stat.shippingValue')), label: String(t('home.hero.stat.shipping')) },
        { icon: <Shield size={20} />, value: String(t('home.hero.stat.returnsValue')), label: String(t('home.hero.stat.returns')) },
      ]
    : isSummer
    ? [
        { icon: <Sun size={20} />, value: String(t('home.hero.stat.productsValue')), label: String(t('home.hero.stat.products')) },
        { icon: <Star size={20} />, value: '4.9★', label: String(t('home.hero.stat.rating')) },
        { icon: <Truck size={20} />, value: String(t('home.hero.stat.shippingValue')), label: String(t('home.hero.stat.shipping')) },
        { icon: <Shield size={20} />, value: String(t('home.hero.stat.returnsValue')), label: String(t('home.hero.stat.returns')) },
      ]
    : [
        { icon: <ShoppingBag size={20} />, value: String(t('home.hero.stat.productsValue')), label: String(t('home.hero.stat.products')) },
        { icon: <Star size={20} />, value: '4.9★', label: String(t('home.hero.stat.rating')) },
        { icon: <Truck size={20} />, value: String(t('home.hero.stat.shippingValue')), label: String(t('home.hero.stat.shipping')) },
        { icon: <Shield size={20} />, value: String(t('home.hero.stat.returnsValue')), label: String(t('home.hero.stat.returns')) },
      ];

  const accentColor = '#C9A84C';
  const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';

  const headingSubtitle = isPremium
    ? String(t('home.hero.premiumSlideSubtitle'))
    : isSummer
    ? String(t('home.hero.summerSlideSubtitle'))
    : String(t('home.hero.newSeasonSubtitle'));

  const headingHighlight = isPremium
    ? String(t('home.hero.premiumSlideHighlight'))
    : isSummer
    ? String(t('home.hero.summerSlideHighlight'))
    : String(t('home.hero.newSeasonHighlight'));

  const description = isPremium
    ? String(t('home.hero.premiumSlideDescription'))
    : isSummer
    ? String(t('home.hero.summerSlideDescription'))
    : String(t('home.hero.newSeasonDescription'));

  const ctaIcon = isPremium ? <Crown size={16} /> : isSummer ? <Sun size={16} /> : <ShoppingBag size={16} />;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideIndex}
        initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isArabic ? -40 : 40 }}
        transition={{ duration: 0.5 }}
        dir={isArabic ? 'rtl' : 'ltr'}
        className={`w-full max-w-3xl px-6 sm:px-10 lg:px-20 flex flex-col items-start text-start ${
          isArabic ? 'ml-auto mr-0' : 'mr-auto ml-0'
        }`}
      >
        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-5">
          {isPremium && <Crown size={12} className="text-[#D4AF37]" />}
          <span className={`w-2 h-2 rounded-full animate-pulse flex-shrink-0 ${isPremium ? 'hidden' : 'block'}`} style={{ backgroundColor: accentColor }} />
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/90">
            {String(t(slide.titleKey))}
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 leading-[1.05] tracking-tight text-white"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
        >
          {headingSubtitle}{' '}
          <span
            style={{
              background: accentGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {headingHighlight}
          </span>
        </h1>

        {/* Divider */}
        <div
          className="h-[2px] w-16 mb-4 self-start"
          style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
        />

        {/* Description */}
        <p className="text-sm sm:text-base lg:text-lg mb-7 leading-relaxed text-white/75 max-w-xl">
          {description}
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-2 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-3.5 py-2.5 hover:bg-white/15 hover:border-white/25 transition-all duration-200"
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}25`, border: `1px solid ${accentColor}50`, color: accentColor }}
              >
                {stat.icon}
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">{stat.value}</div>
                <div className="text-white/50 text-[11px] leading-tight mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={slide.buttonLink}
            className="group inline-flex items-center gap-2.5 text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ background: accentGradient }}
          >
            {ctaIcon}
            {String(t(slide.buttonTextKey))}
            <ArrowIcon size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/pages/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-white/30 text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95"
          >
            {String(t('home.hero.explore'))}
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
