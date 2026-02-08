"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function ElectronicSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const category = params.category as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
    'audio': {
      title: t('electronic.category.audio'),
      description: t('electronic.subcategory.audio.description'),
      subCategory: "audio"
    },
    'smart-home': {
      title: t('electronic.category.smartHome'),
      description: t('electronic.subcategory.smartHome.description'),
      subCategory: "smarthome"
    },
    'personal-tech': {
      title: t('electronic.category.personalTech'),
      description: t('electronic.subcategory.personalTech.description'),
      subCategory: "personaltech"
    },
    'photography': {
      title: t('electronic.category.photography'),
      description: t('electronic.subcategory.photography.description'),
      subCategory: "cameras"
    }
  };

  const data = subCategoryData[category];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="electronics"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
