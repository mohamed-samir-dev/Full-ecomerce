"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";

export default function MenCollectionPage() {
  const { isArabic } = useLanguage();

  return (
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
  );
}
