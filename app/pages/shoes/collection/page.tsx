"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";

export default function ShoesCollectionPage() {
  const { isArabic } = useLanguage();

  return (
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
  );
}
