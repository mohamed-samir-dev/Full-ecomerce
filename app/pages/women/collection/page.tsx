"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";

export default function WomenCollectionPage() {
  const { isArabic } = useLanguage();

  return (
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
  );
}
