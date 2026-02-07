"use client";

import CollectionPage from "@/app/components/CollectionPage";
import { useLanguage } from "@/context/LanguageContext";

export default function AccessoriesCollectionPage() {
  const { isArabic } = useLanguage();

  return (
    <CollectionPage
      subCategory="Accessories"
      title={isArabic ? "مجموعة الإكسسوارات" : "Accessories's Collection"}
      subtitle={isArabic ? "إكسسوارات راقية مصممة لتعزيز أسلوبك اليومي" : "Refined accessories designed to elevate your everyday style"}
      subtitleColor="#F13B3B"
      bannerImage="/images/top-view-beautiful-rpg-still-life-items.avif"
      breadcrumbs={[
        { label: isArabic ? "الرئيسية" : "Home", href: "/" },
        { label: isArabic ? "إكسسوارات" : "accessories", href: "/pages/accessories" },
        { label: isArabic ? "المجموعة" : "Collection", href: "" }
      ]}
    />
  );
}
