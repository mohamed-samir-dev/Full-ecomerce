'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface DynamicMetadataProps {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  keywordsAr?: string[];
  keywordsEn?: string[];
}

export default function DynamicMetadata({
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  keywordsAr = [],
  keywordsEn = [],
}: DynamicMetadataProps) {
  const { isArabic } = useLanguage();

  useEffect(() => {
    // Update document title
    const title = isArabic ? titleAr : titleEn;
    document.title = `${title} | Global Shop`;

    // Update meta description
    const description = isArabic ? descriptionAr : descriptionEn;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update meta keywords
    const keywords = isArabic ? keywordsAr : keywordsEn;
    if (keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords.join(', '));
    }

    // Update Open Graph tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOgTag('og:title', title);
    updateOgTag('og:description', description);
    updateOgTag('og:locale', isArabic ? 'ar_SA' : 'en_US');

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);

    // Update html lang attribute
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic, titleAr, titleEn, descriptionAr, descriptionEn, keywordsAr, keywordsEn]);

  return null;
}
