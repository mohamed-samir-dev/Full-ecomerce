"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";
import DynamicMetadata from '@/app/components/DynamicMetadata';

export default function MenCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <>
      <DynamicMetadata
        titleAr="مجموعة الرجال - ملابس رجالية عصرية"
        titleEn="Men's Collection - Modern Men's Clothing"
        descriptionAr="اكتشف مجموعتنا الكاملة من الملابس الرجالية العصرية. قمصان، بنطلونات، بدلات وإكسسوارات بتصاميم أنيقة وجودة عالية"
        descriptionEn="Discover our complete range of modern men's clothing. Shirts, pants, suits and accessories with elegant designs and high quality"
        keywordsAr={['ملابس رجالية', 'أزياء رجالية', 'قمصان', 'بنطلونات', 'بدلات رجالية']}
        keywordsEn={['men\'s clothing', 'men\'s fashion', 'shirts', 'pants', 'men\'s suits']}
      />
      <CollectionPage
        category="men"
        title={isArabic ? "مجموعة الرجال" : "Men's Collection"}
        subtitle={isArabic ? "اكتشف مجموعتنا الكاملة من القطع الأنيقة" : "Discover our complete range of sophisticated pieces"}
        subtitleColor="#6563D2"
        bannerImage="/images/men-collection.avif"
        breadcrumbs={[
          { label: isArabic ? "الرئيسية" : "Home", href: "/" },
          { label: isArabic ? "رجال" : "Men", href: "/pages/men" },
          { label: isArabic ? "المجموعة" : "Collection", href: "" }
        ]}
      />
    </>
  );
}
