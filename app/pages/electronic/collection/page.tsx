"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";

export default function ElectronicCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <CollectionPage
      category="electronics"
      title={isArabic ? "مجموعة الإلكترونيات" : "Electronics Collection"}
      subtitle={isArabic ? "اكتشف أحدث التقنيات والأجهزة الذكية" : "Discover the latest technology and smart devices"}
      subtitleColor="#AA9DBE"
      bannerImage="/images/top-view-dvd-music-set.avif"
      breadcrumbs={[
        { label: isArabic ? "الرئيسية" : "Home", href: "/" },
        { label: isArabic ? "إلكترونيات" : "Electronics", href: "/pages/electronic" },
        { label: isArabic ? "المجموعة" : "Collection", href: "" }
      ]}
    />
  );
}
