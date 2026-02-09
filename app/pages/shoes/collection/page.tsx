"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";
import DynamicMetadata from '@/app/components/DynamicMetadata';

export default function ShoesCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <>
      <DynamicMetadata
        titleAr="مجموعة الأحذية - أحذية عصرية ومريحة"
        titleEn="Shoes Collection - Modern and Comfortable Shoes"
        descriptionAr="اكتشف مجموعتنا الكاملة من الأحذية العصرية. أحذية رياضية، كاجوال، رسمية وأحذية للمناسبات"
        descriptionEn="Discover our complete range of modern shoes. Sneakers, casual, formal and occasion shoes"
        keywordsAr={['أحذية', 'أحذية رياضية', 'أحذية رسمية', 'أحذية كاجوال']}
        keywordsEn={['shoes', 'sneakers', 'formal shoes', 'casual shoes']}
      />
      <CollectionPage
        subCategory="Shoes"
        title={isArabic ? "مجموعة الأحذية" : "Shoes Collection"}
        subtitle={isArabic ? "أحذية أنيقة مصممة للراحة والأناقة الخالدة" : "Elegant footwear designed for comfort and timeless style"}
        bannerImage="/images/shoes-collection.avif"
        breadcrumbs={[
          { label: isArabic ? "الرئيسية" : "Home", href: "/" },
          { label: isArabic ? "أحذية" : "shoes", href: "/pages/shoes" },
          { label: isArabic ? "المجموعة" : "Collection", href: "" }
        ]}
      />
    </>
  );
}
