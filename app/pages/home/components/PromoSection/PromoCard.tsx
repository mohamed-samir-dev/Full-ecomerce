import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import { PromoItem } from '../../types/home.types';

interface PromoCardProps {
  item: PromoItem;
  index: number;
  isDarkMode: boolean;
}

const accentGradient = 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)';

const cardAccents = [
  { glow: 'rgba(201,168,76,0.18)', tag: 'NEW' },
  { glow: 'rgba(201,168,76,0.14)', tag: 'SALE' },
  { glow: 'rgba(201,168,76,0.16)', tag: 'HOT' },
];

export const PromoCard = ({ item, index, isDarkMode }: PromoCardProps) => {
  const { t, isArabic } = useTranslation();
  const accent = cardAccents[index % cardAccents.length];

  return (
    <Link
      href="pages/shop"
      dir={isArabic ? 'rtl' : 'ltr'}
      className="group relative flex flex-row sm:flex-col overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.02] sm:hover:-translate-y-1"
      style={{
        background: isDarkMode ? '#1e1e1e' : '#ffffff',
        border: isDarkMode ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(201,168,76,0.25)',
        boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{ boxShadow: `inset 0 0 0 1.5px rgba(201,168,76,0.6)` }}
      />

      {/* Image */}
      <div
        className="relative flex-shrink-0 w-[100px] h-auto sm:w-full sm:h-[200px] lg:h-[220px] overflow-hidden"
        style={{ background: isDarkMode ? '#111' : '#f0ebe3' }}
      >
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          loading="lazy"
          quality={80}
          sizes="(max-width: 640px) 100px, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest text-black"
          style={{ background: accentGradient }}
        >
          {accent.tag}
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-px sm:w-full sm:h-px flex-shrink-0"
        style={{ background: `linear-gradient(to ${isDarkMode ? 'bottom' : 'bottom'}, transparent, rgba(201,168,76,0.3), transparent)` }}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-5 gap-1.5 sm:gap-3 justify-center sm:justify-start min-w-0">
        <h3 className={`text-sm sm:text-lg font-black leading-tight truncate sm:whitespace-normal ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {String(t(item.titleKey))}
        </h3>

        <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none" style={{ color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.55)' }}>
          {String(t(item.descriptionKey))}
        </p>

        <span
          className="inline-flex items-center gap-1.5 w-fit mt-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold text-black"
          style={{ background: accentGradient }}
        >
          {String(t(item.buttonTextKey))}
          <svg
            className={`w-2.5 h-2.5 ${isArabic ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};
