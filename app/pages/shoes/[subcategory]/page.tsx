"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function ShoesSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
    'formal': {
      title: t('shoes.subcategory.formal.title'),
      description: t('shoes.subcategory.formal.description'),
      subCategory: "Formal Shoes"
    },
    'sandals': {
      title: t('shoes.subcategory.sandals.title'),
      description: t('shoes.subcategory.sandals.description'),
      subCategory: "Summer sandals"
    },
    'casual': {
      title: t('shoes.subcategory.casual.title'),
      description: t('shoes.subcategory.casual.description'),
      subCategory: "Casual"
    },
    'sports': {
      title: t('shoes.subcategory.sports.title'),
      description: t('shoes.subcategory.sports.description'),
      subCategory: "Luxury sports shoes"
    }
  };

  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="shoes"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
