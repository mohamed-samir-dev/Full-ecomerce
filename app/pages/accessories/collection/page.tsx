"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";
import DynamicMetadata from '@/app/components/DynamicMetadata';

export default function AccessoriesCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <>
      <DynamicMetadata
        titleAr="مجموعة الإكسسوارات - إكسسوارات أنيقة"
        titleEn="Accessories Collection - Elegant Accessories"
        descriptionAr="اكتشف مجموعتنا الكاملة من الإكسسوارات الأنيقة. حقائب، ساعات، نظارات ومجوهرات"
        descriptionEn="Discover our complete range of elegant accessories. Bags, watches, sunglasses and jewelry"
        keywordsAr={['إكسسوارات', 'حقائب', 'ساعات', 'نظارات', 'مجوهرات']}
        keywordsEn={['accessories', 'bags', 'watches', 'sunglasses', 'jewelry']}
      />
      <CollectionPage
        subCategory="Accessories"
        title={isArabic ? "مجموعة الإكسسوارات" : "Accessories's Collection"}
        subtitle={isArabic ? "إكسسوارات راقية مصممة لتعزيز أسلوبك اليومي" : "Refined accessories designed to elevate your everyday style"}
        subtitleColor="#F13B3B"
        bannerImage="/images/top-view-beautiful-rpg-still-life-items.avif"
        breadcrumbs={[
          { label: isArabic ? "الرئيسية" : "Home", href: "/" },
          { label: isArabic ? "إكسسوارات" : "accessories", href: "/pages/accessories" },
          { label: isArabic ? "المجموعة" : "Collection", href: "" }
        ]}
      />
    </>
  );
}
