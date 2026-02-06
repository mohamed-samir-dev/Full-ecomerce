"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function AccessoriesSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; secondtype: string } } = {
    'jewelry': {
      title: t('accessories.subcategory.jewelry.title'),
      description: t('accessories.subcategory.jewelry.description'),
      secondtype: "Jewelry"
    },
    'silk': {
      title: t('accessories.subcategory.silk.title'),
      description: t('accessories.subcategory.silk.description'),
      secondtype: "Silk"
    },
    'sunglasses': {
      title: t('accessories.subcategory.sunglasses.title'),
      description: t('accessories.subcategory.sunglasses.description'),
      secondtype: "Sunglasses"
    },
    'watches': {
      title: t('accessories.subcategory.watches.title'),
      description: t('accessories.subcategory.watches.description'),
      secondtype: "Watches"
    }
  };

  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      subCategory="accessories"
      secondtype={data.secondtype}
      title={data.title}
      description={data.description}
    />
  );
}
