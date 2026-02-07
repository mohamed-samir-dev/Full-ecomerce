"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";

export default function PetCollectionPage() {
  const { isArabic } = useLanguage();

  return (
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
  );
}
