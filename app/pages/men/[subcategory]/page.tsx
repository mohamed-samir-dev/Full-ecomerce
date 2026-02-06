"use client";

import { useParams } from 'next/navigation';
import CategoryPage from "@/app/components/CategoryPage";
import { useTranslation } from '@/i18n';

export default function MenSubCategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const subcategory = params.subcategory as string;

  const subCategoryData: { [key: string]: { title: string; description: string; subCategory: string } } = {
    'apparel': {
      title: t('men.subcategory.apparel.title'),
      description: t('men.subcategory.apparel.description'),
      subCategory: "Apparel"
    },
    'shoes': {
      title: t('men.subcategory.shoes.title'),
      description: t('men.subcategory.shoes.description'),
      subCategory: "Shoes"
    },
    'bags': {
      title: t('men.subcategory.bags.title'),
      description: t('men.subcategory.bags.description'),
      subCategory: "bags"
    },
    'accessories': {
      title: t('men.subcategory.accessories.title'),
      description: t('men.subcategory.accessories.description'),
      subCategory: "accessories"
    }
  };

  const data = subCategoryData[subcategory];

  if (!data) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryPage
      category="men"
      subCategory={data.subCategory}
      title={data.title}
      description={data.description}
    />
  );
}
