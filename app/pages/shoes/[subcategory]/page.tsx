"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function ShoesSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string; secondtype?: string } } = {
    'formal': {
      title: t('shoes.subcategory.formal.title'),
      description: t('shoes.subcategory.formal.description'),
      subCategory: "Shoes",
      secondtype: "formal"
    },
    'sandals': {
      title: t('shoes.subcategory.sandals.title'),
      description: t('shoes.subcategory.sandals.description'),
      subCategory: "Shoes",
      secondtype: "summer"
    },
    'casual': {
      title: t('shoes.subcategory.casual.title'),
      description: t('shoes.subcategory.casual.description'),
      subCategory: "Shoes",
      secondtype: "casual"
    },
    'sports': {
      title: t('shoes.subcategory.sports.title'),
      description: t('shoes.subcategory.sports.description'),
      subCategory: "Shoes",
      secondtype: "athlete"
    }
  };

  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      subCategory={data.subCategory}
      secondtype={data.secondtype}
      title={data.title}
      description={data.description}
    />
  );
}
