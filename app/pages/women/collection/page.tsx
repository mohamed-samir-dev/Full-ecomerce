"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";
import DynamicMetadata from '@/app/components/DynamicMetadata';

export default function WomenCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <>
      <DynamicMetadata
        titleAr="مجموعة النساء - ملابس نسائية أنيقة"
        titleEn="Women's Collection - Elegant Women's Clothing"
        descriptionAr="اكتشف مجموعتنا الكاملة من الملابس النسائية الأنيقة. فساتين، بلوزات، تنانير وإكسسوارات بتصاميم عصرية"
        descriptionEn="Discover our complete range of elegant women's clothing. Dresses, blouses, skirts and accessories with modern designs"
        keywordsAr={['ملابس نسائية', 'أزياء نسائية', 'فساتين', 'بلوزات', 'تنانير']}
        keywordsEn={['women\'s clothing', 'women\'s fashion', 'dresses', 'blouses', 'skirts']}
      />
      <CollectionPage
        category="women"
        title={isArabic ? "مجموعة النساء" : "Women's Collection"}
        subtitle={isArabic ? "أنماط خالدة مصممة بثقة وأناقة" : "Timeless styles crafted for confidence and elegance"}
        bannerImage="/images/women-colection.avif"
        breadcrumbs={[
          { label: isArabic ? "الرئيسية" : "Home", href: "/" },
          { label: isArabic ? "نساء" : "Women", href: "/pages/women" },
          { label: isArabic ? "المجموعة" : "Collection", href: "" }
        ]}
      />
    </>
  );
}
