"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function WomenSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
    'apparel': {
      title: t('women.subcategory.apparel.title'),
      description: t('women.subcategory.apparel.description'),
      subCategory: "apparel"
    },
    'shoes': {
      title: t('women.subcategory.shoes.title'),
      description: t('women.subcategory.shoes.description'),
      subCategory: "shoes"
    },
    'bags': {
      title: t('women.subcategory.bags.title'),
      description: t('women.subcategory.bags.description'),
      subCategory: "bags"
    },
    'accessories': {
      title: t('women.subcategory.accessories.title'),
      description: t('women.subcategory.accessories.description'),
      subCategory: "accessories"
    },
    'beauty': {
      title: t('women.subcategory.beauty.title'),
      description: t('women.subcategory.beauty.description'),
      subCategory: "beauty"
    }
  };

  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="women"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
