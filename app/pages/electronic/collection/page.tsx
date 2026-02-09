"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";
import DynamicMetadata from '@/app/components/DynamicMetadata';

export default function ElectronicCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <>
      <DynamicMetadata
        titleAr="مجموعة الإلكترونيات - أحدث التقنيات"
        titleEn="Electronics Collection - Latest Technology"
        descriptionAr="اكتشف مجموعتنا من الإلكترونيات والأجهزة التقنية. هواتف، أجهزة لوحية، سماعات وملحقات"
        descriptionEn="Discover our collection of electronics and tech devices. Phones, tablets, headphones and accessories"
        keywordsAr={['إلكترونيات', 'هواتف', 'أجهزة لوحية', 'سماعات', 'تقنية']}
        keywordsEn={['electronics', 'phones', 'tablets', 'headphones', 'technology']}
      />
      <CollectionPage
        category="electronics"
        title={isArabic ? "مجموعة الإلكترونيات" : "Electronics Collection"}
        subtitle={isArabic ? "اكتشف أحدث التقنيات والأجهزة الذكية" : "Discover the latest technology and smart devices"}
        subtitleColor="#AA9DBE"
        bannerImage="/images/top-view-dvd-music-set.avif"
        breadcrumbs={[
          { label: isArabic ? "الرئيسية" : "Home", href: "/" },
          { label: isArabic ? "إلكترونيات" : "Electronics", href: "/pages/electronic" },
          { label: isArabic ? "المجموعة" : "Collection", href: "" }
        ]}
      />
    </>
  );
}
