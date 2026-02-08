"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/i18n';

interface Category {
  image: string;
  title: string;
  link: string;
  size: 'large' | 'small';
}

interface BrowseCategoriesProps {
  categories: Category[];
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonHoverColor?: string;
}

export default function BrowseCategories({ categories, buttonBgColor = "#FFFFFF", buttonTextColor = "#000000", buttonHoverColor = "#F3F4F6" }: BrowseCategoriesProps) {
  const [large1, small1, small2, large2] = categories;
  const { t } = useTranslation();

  const buttonStyle = {
    '--button-bg': buttonBgColor,
    '--button-text': buttonTextColor,
    '--button-hover': buttonHoverColor,
  } as React.CSSProperties;

  return (
    <div className="max-w-[1400px] mx-auto mt-8" style={buttonStyle}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="col-span-2 h-64 rounded-2xl relative overflow-hidden">
            <Image src={large1.image} alt={large1.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" quality={70} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
              <p className="text-white text-2xl font-bold">{large1.title}</p>
              <Link href={large1.link}>
                <button className="px-6 py-2 rounded-lg font-semibold transition hover:opacity-90" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}>{t('common.discoverMore')}</button>
              </Link>
            </div>
          </div>
          <div className="h-48 rounded-2xl relative overflow-hidden">
            <Image src={small1.image} alt={small1.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" quality={70} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
              <p className="text-white text-xl font-bold">{small1.title}</p>
              <Link href={small1.link}>
                <button className="px-4 py-1.5 rounded-lg font-semibold transition text-sm hover:opacity-90" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}>{t('common.discoverMore')}</button>
              </Link>
            </div>
          </div>
          <div className="h-48 rounded-2xl relative overflow-hidden">
            <Image src={small2.image} alt={small2.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" quality={70} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
              <p className="text-white text-xl font-bold">{small2.title}</p>
              <Link href={small2.link}>
                <button className="cursor-pointer px-4 py-1.5 rounded-lg font-semibold transition text-sm hover:opacity-90" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}>{t('common.discoverMore')}</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-64 lg:h-full rounded-2xl relative overflow-hidden">
          <Image src={large2.image} alt={large2.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" quality={70} placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI2VlZSIvPjwvc3ZnPg==" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
            <p className="text-white text-3xl font-bold">{large2.title}</p>
            <Link href={large2.link}>
              <button className="cursor-pointer px-6 py-2 rounded-lg font-semibold transition hover:opacity-90" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}>{t('common.discoverMore')}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
