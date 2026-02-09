"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";
import DynamicMetadata from '@/app/components/DynamicMetadata';

export default function PetCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <>
      <DynamicMetadata
        titleAr="مستلزمات الحيوانات الأليفة - كل ما يحتاجه حيوانك"
        titleEn="Pet Supplies - Everything Your Pet Needs"
        descriptionAr="اكتشف مجموعتنا الكاملة من مستلزمات الحيوانات الأليفة. طعام، ألعاب، أدوات العناية والإكسسوارات"
        descriptionEn="Discover our complete range of pet supplies. Food, toys, grooming tools and accessories"
        keywordsAr={['مستلزمات حيوانات', 'طعام حيوانات', 'ألعاب حيوانات', 'أدوات العناية']}
        keywordsEn={['pet supplies', 'pet food', 'pet toys', 'grooming tools']}
      />
      <CollectionPage
        category="pet"
        title={isArabic ? "مجموعة مستلزمات الحيوانات الأليفة" : "pet's Collection"}
        titleColor="#839A7E"
        subtitle={isArabic ? "اكتشف مجموعتنا الكاملة من القطع المميزة" : "Discover our complete range of sophisticated pieces"}
        subtitleColor="#10E6E6"
        bannerImage="/images/pet-page.avif"
        breadcrumbs={[
          { label: isArabic ? "الرئيسية" : "Home", href: "/" },
          { label: isArabic ? "مستلزمات الحيوانات" : "pet", href: "/pages/PetSupplies" },
          { label: isArabic ? "المجموعة" : "Collection", href: "" }
        ]}
      />
    </>
  );
}
