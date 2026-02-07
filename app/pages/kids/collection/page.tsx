"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";

export default function KidCollectionPage() {
  const { isArabic } = useLanguage();

  return (
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
  );
}
