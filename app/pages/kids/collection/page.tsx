"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";
import DynamicMetadata from '@/app/components/DynamicMetadata';

export default function KidCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <>
      <DynamicMetadata
        titleAr="مجموعة الأطفال - ملابس أطفال مريحة"
        titleEn="Kids Collection - Comfortable Kids Clothing"
        descriptionAr="اكتشف مجموعتنا الكاملة من ملابس الأطفال المريحة والعصرية. ملابس للبنات والأولاد بجودة عالية"
        descriptionEn="Discover our complete range of comfortable and modern kids clothing. Clothing for girls and boys with high quality"
        keywordsAr={['ملابس أطفال', 'ملابس بنات', 'ملابس أولاد', 'أزياء أطفال']}
        keywordsEn={['kids clothing', 'girls clothing', 'boys clothing', 'children\'s fashion']}
      />
      <CollectionPage
        category="kid"
        title={isArabic ? "مجموعة الأطفال" : "Kids' Collection"}
        subtitle={isArabic ? "أنماط مرحة ومستلزمات مصممة للمغامرات اليومية" : "Playful styles and essentials made for everyday adventures"}
        subtitleColor="#EB1369"
        bannerImage="/images/kid-collection.avif"
        breadcrumbs={[
          { label: isArabic ? "الرئيسية" : "Home", href: "/" },
          { label: isArabic ? "أطفال" : "Kids", href: "/pages/kids" },
          { label: isArabic ? "المجموعة" : "Collection", href: "" }
        ]}
      />
    </>
  );
}
