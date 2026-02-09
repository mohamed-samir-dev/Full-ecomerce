"use client";

import { useParams } from 'next/navigation';
import DynamicMetadata from '@/app/components/DynamicMetadata';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function ElectronicSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const category = params.category as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string; titleAr: string; titleEn: string; descAr: string; descEn: string } } = {
    'audio': { title: t('electronic.category.audio'), description: t('electronic.subcategory.audio.description'), subCategory: "audio", titleAr: "سماعات", titleEn: "Audio", descAr: "سماعات عالية الجودة", descEn: "High quality audio" },
    'smart-home': { title: t('electronic.category.smartHome'), description: t('electronic.subcategory.smartHome.description'), subCategory: "smarthome", titleAr: "منزل ذكي", titleEn: "Smart Home", descAr: "أجهزة منزل ذكي", descEn: "Smart home devices" },
    'personal-tech': { title: t('electronic.category.personalTech'), description: t('electronic.subcategory.personalTech.description'), subCategory: "personaltech", titleAr: "تقنية شخصية", titleEn: "Personal Tech", descAr: "أجهزة تقنية شخصية", descEn: "Personal tech devices" },
    'photography': { title: t('electronic.category.photography'), description: t('electronic.subcategory.photography.description'), subCategory: "cameras", titleAr: "كاميرات", titleEn: "Photography", descAr: "كاميرات ومعدات تصوير", descEn: "Cameras and photography equipment" }
  };

  const data = subCategoryData[category];
  if (!data) return <div>Category not found</div>;

  return (
    <>
      <DynamicMetadata titleAr={data.titleAr} titleEn={data.titleEn} descriptionAr={data.descAr} descriptionEn={data.descEn} keywordsAr={['إلكترونيات', data.titleAr]} keywordsEn={['electronics', data.titleEn]} />
      <CategoryPage category="electronics" subCategory={data.subCategory} title={data.title} description={data.description} />
    </>
  );
}
